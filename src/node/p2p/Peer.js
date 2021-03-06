/* eslint-disable eqeqeq */

const net = require('net');
const P2PDataType = require('./enums/P2PDataType');
const ErrorContext = require('./enums/ErrorContext');

class Peer {

  constructor(name, state, port) {
    this.state = state; // Estado da sala
    this.name = name; // Nome único do peer
    this.port = port; // Porta em que este peer irá ouvir conexões
    this.server = null; // Servidor TCP deste peer
    this._connections = []; // Conexões estabelecidas por este peer
    this._knownHosts = []; // Hosts conhecidas por este peer
  }

  // Abre o servidor para este peer
  createServer = (onServerCreated) => {
    this.server = net.createServer(socket => {
      // Adiciona esta conexão estabelecida ao array de conexões
      this._addConnection(socket);

      // Adiciona listeners para este socket
      this._addSocketListeners(socket);

      // Se apresenta para o peer cliente
      this._introduceMyselfTo(socket, this.port);
    });

    this.server.listen(this.port, () => {
      /* O port passado como parâmetro no listen pode ser 0, que faz
      com que seja gerado uma porta aleatória e livre para o servidor 
      ouvir, então, o this.port recebe esta nova porta gerada */
      this.port = this.server.address().port;
      
      console.log(`Ouvindo na porta ${this.port}...`);

      // Se o cliente tiver fornecido uma callback, invocá-la
      if (onServerCreated) {
        onServerCreated();
      }
    })
      .on('error', err =>
        this.onError(err, ErrorContext.SERVER)
      );

    return this;
  }

  // Remove o socket dos arrays de conexões e hosts conhecidas
  _forgetConnection = socket => {
    /* Atribui um novo array para o this._connections,
    porem, sem o socket desconectado */
    this._connections = this._connections.filter(conn => {
      return conn !== socket;
    });

    this._knownHosts.forEach(host => {
      const isKnownPort = (host.portImConnected == socket.remotePort 
        || host.serverPort == socket.remotePort);

      if (host.ip === socket.remoteAddress && isKnownPort) {
        const indexToRemove = this._knownHosts.indexOf(host);
        this._knownHosts.splice(indexToRemove, 1);

        this.onDisconnect(socket, host);
      }
    });
  }

  /* Envia as hosts conhecidas por este 
  peer para o peer cliente */
  _sendKnownHostsTo = (socket, knownHosts) => {
    const P2PDataTemplate = {
      type: P2PDataType.KNOWN_HOSTS,
      senderName: this.name,
      content: knownHosts
    };

    this._sendData(socket, P2PDataTemplate);
  }

  // Envia o estado deste peer para o peer cliente
  _sendStateTo = (socket, state) => {
    const P2PDataTemplate = {
      type: P2PDataType.STATE,
      senderName: this.name,
      content: state
    };

    this._sendData(socket, P2PDataTemplate);
  }
  
  // Tenta se conectar em um IP:PORTA
  connectTo = (host, port, options) => {
    try {
      const connect = () => {
        const socket = net.createConnection({ host, port }, () => {
          // Caso o cliente tenha fornecido uma callback, invocá-la
          if (options && options.onConnect) {
            options.onConnect();
          }
    
          /* Se o host em que este peer estiver conectando
          não for conhecido, adiciona ao array de conhecidos
  
          Obs: o nome é desconhecido, só após o servidor se 
          apresentar que ele será atribuido */
          const hostImConnected = {
            name: '', ip: host, 
            portImConnected: socket.remotePort, 
            serverPort: port
          }
  
          if (!this._isKnownHost(hostImConnected)) {
            this._addKnownHost(hostImConnected);
          }
          
          // Adiciona esta conexão estabelecida ao array de conexões
          this._addConnection(socket);
    
          // Adiciona listeners para este socket
          this._addSocketListeners(socket);
    
          // Envia o nome e a porta do servidor deste peer 
          this._introduceMyselfTo(socket, this.port);
    
          /* Tirando o time out estabelecido anteriormente para caso
          a conexão não tivesse sido estabelecida no tempo definido */
          socket.setTimeout(0);
        })
          .on('error', err => this.onError(err, ErrorContext.CONNECT));
    
        /* Definindo o time out para a tentativa de conexão
        Obs: se o time out não for fornecido, o padrão é 20 segundos */
        socket.setTimeout((options.timeoutInSeconds || 20) * 1000, () => {
          this.onError(new Error('ETIMEDOUT'), ErrorContext.CONNECT);
          socket.destroy();
        });
      }

      /* Apenas se conecta se o servidor deste peer estiver aberto
      (caso não esteja, abre um e se conecta) */
      this.server ? connect() : this.createServer(connect);

      return this;
    } catch (err) {
      this.onError(err.message, ErrorContext.CONNECT);
    }
  }

  // Adiciona a host para o array de hosts conhecidas
  _addKnownHost = host => {
    this._knownHosts.push(host);
  }

  // Adiciona a conexão para o array de conexões conhecidas
  _addConnection = socket => {
    this._connections.push(socket);
  }

  // Verifica se a host passada está entre o array de hosts conhecidas
  _isKnownHost = host => {
    const hostFound = this._knownHosts.find(
      (knownHost) => {
        const isKnownIp = knownHost.ip === host.ip.slice(7) || knownHost.ip === host.ip;
        const isKnownPort = knownHost.serverPort === host.serverPort;
        const isKnownName = knownHost.name === host.name;
        
        return (isKnownIp && isKnownPort) || isKnownName;
      }
    );

    return hostFound !== undefined;
  }

  // Verifica se o nome passado está sendo usado por uma host
  _isNameUsed = name => {
    // Verifica se há um nome igual entre as hosts conhecidas
    for (let i = 0; i < this._knownHosts.length; i++) {
      if (this._knownHosts[i].name === name) {
        return true;
      }
    }

    // Se o nome não for igual ao deste peer, então retorna false
    return name === this.name;
  }

  // Recebe as hosts conhecidas de outro peer
  _receiveKnownHosts = (senderSocket, P2PDataTemplate) => {
    if (P2PDataTemplate.type !== P2PDataType.KNOWN_HOSTS) {
      return;
    }
    
    /* Para cada host recebida pelo servidor, caso este 
    peer não conheça alguma, adiciona no próprio array 
    de hosts conhecidas e se conecta com ela */
    P2PDataTemplate.content.forEach(host => {
      if (!this._isKnownHost(host)) {
        const connectOptions = {
          onConnect: () => { this._addKnownHost(host); }
        }

        this.connectTo(host.ip, host.serverPort, connectOptions);
      }
    });
  }

  // Recebe o estado da sala
  _receiveState = P2PDataTemplate => {
    if (P2PDataTemplate.type !== P2PDataType.STATE) {
      return;
    }

    this.state = P2PDataTemplate.content;
  }

  // Recebe o nome de um peer e a porta em que ele está ouvindo
  _receiveIntroduction = (socket, P2PDataTemplate) => {
    if (P2PDataTemplate.type !== P2PDataType.PEER_INTRODUCTION) {
      return;
    }

    for (let i = 0; i < this._knownHosts.length; i++) {
      const currentHost = this._knownHosts[i];

      // Se a porta já for conhecida
      if (currentHost.serverPort == P2PDataTemplate.content) {
        /* Se o nome estiver vazio, é sinal de que o servidor 
        em que este peer conectou se apresentou */
        if (currentHost.name.length === 0) {
          currentHost.name = P2PDataTemplate.senderName;
        }
        
        /* Retorne pois o servidor já é conhecido e
        este peer já configurou seus listeners */
        return;
      }
    }

    // Verifica e atribui um nome disponível para o peer conectado
    const availableNameForSender = this
      ._findAvailableName(P2PDataTemplate.senderName);

    // Se o nome do peer cliente for diferente do nome disponível
    if (availableNameForSender !== P2PDataTemplate.senderName) {
      const nameChangedData = {
        type: P2PDataType.NAME_CHANGED,
        senderName: this.name,
        content: availableNameForSender
      }

      // Avisa o peer para que ele possa alterar o seu nome
      this._sendData(socket, nameChangedData);
    }

    /* Chamar o callback de onConnection pois o peer
    se conectou com sucesso */
    this.onConnection(socket, availableNameForSender);

    /* Este peer envia para o cliente todas as hosts que
    conhece (com excessão do próprio cliente) para que ele
    também possa se conectar nos outros peers da rede */
    this._sendKnownHostsTo(socket, this._knownHosts.filter(host => {
      return (host.ip != socket.remoteAddress.slice(7)
            || host.ip != socket.remoteAddress)
            && host.serverPort != P2PDataTemplate.content;
    }));

    // Adiciona o peer ao array de hosts conhecidas
    this._addKnownHost({
      name: availableNameForSender,
      ip: socket.remoteAddress || '',
      portImConnected: socket.remotePort,
      serverPort: P2PDataTemplate.content
    });

    // Enviando o estado atual para o cliente
    this._sendStateTo(socket, this.state);
  }

  // Função chamada quando o peer servidor altera o nome deste peer
  _handleNameChanged = (P2PDataTemplate) => {
    if (P2PDataTemplate.type !== P2PDataType.NAME_CHANGED) {
      return;
    }

    this.name = P2PDataTemplate.content;
  } 

  /* Gera um nome disponível na rede
  Obs: se o próprio nome passado estiver disponível, retorna ele */
  _findAvailableName = name => {
    let count = 0;

    // Se o nome não estiver disponível, altera-lo
    while (this._isNameUsed(name)) {
      const id = parseInt(name[name.length - 1]);

      if (count === 0) {
        // Se o ultimo char do nome passado for um número
        if (Number.isInteger(id)) {
          name = name.slice(0, -1);
          name += `${id + 1}`;
        } else {
          name += '1';
        }
        
        // Vai para a próxima iteração
        continue;
      }
      
      // Incrementando o ID
      name = name.slice(0, -1);
      name += `${id + 1}`;
      
      count++;
    }

    return name;
  }

  // Manda o nome e a porta do servidor deste peer para outro peer
  _introduceMyselfTo = (socket, portImListening) => {
    const P2PDataTemplate = {
      type: P2PDataType.PEER_INTRODUCTION,
      senderName: this.name,
      content: portImListening
    }

    this._sendData(socket, P2PDataTemplate);
  }

  // Envia dados para um único peer
  _sendData = (socket, P2PDataTemplate) => {
    // Adicionando um '\n' no fim da string para marcar o fim do JSON no buffer
    const jsonData = JSON.stringify(P2PDataTemplate).concat('\n');

    try {
      if (!socket.writableEnded) {
        socket.write(jsonData);
      }
    } catch (err) {
      this.onError(err, ErrorContext.SOCKET);
    }
  }

  // Envia dados para todos os Peers conhecidos (este não está incluso)
  broadcast = (P2PDataTemplate) => {
    this._connections.forEach(socket => {
      this._sendData(socket, P2PDataTemplate);
    });
  }

  /* Escuta os dados enviados pelo cliente
    
  Obs: as mensagem são transmitidas atráves da
  interface "P2PDataTemplate" em formato JSON
  */
  _listenClientData = socket => {
    socket.on('data', bufferData => {
      const buffer = bufferData.toString();
      
      /* Se houver mais de um Json no buffer,
      eles são separados pela line break */
      const jsonDatas = buffer
        .split(/\r?\n/)
        .filter(json => json.length !== 0);

      jsonDatas.forEach(jsonData => {
        const P2PDataTemplate = JSON.parse(jsonData);
        
        this._receiveState(P2PDataTemplate);
        this._receiveKnownHosts(socket, P2PDataTemplate);
        this._receiveIntroduction(socket, P2PDataTemplate);
        this._handleNameChanged(P2PDataTemplate);

        this.onData(socket, P2PDataTemplate);
      });
    });
  }

  _addSocketListeners = socket => {
    socket.setEncoding('utf8');
    
    socket.on('close', hadError => {
      this._forgetConnection(socket);
    });

    socket.on('end', () => {
      this._forgetConnection(socket);
    });

    socket.on('error', err => this.onError(err, ErrorContext.SOCKET));

    /* Adiciona uma escuta para ouvir quando
    o socket cliente enviar dados */
    this._listenClientData(socket);
  }

  // Fecha o servidor e as conexões estabelecidas por este peer
  closeServerAndConnections = () => {
    if (this._server) {
      this._server.close();
    }

    this._connections.forEach(socket => {
      socket.end()
    });
  }

  // Retorna o número total de pessoas na network
  getNetworkSize = () => {
    // Hosts conhecidos + 1 para contar o próprio peer
    return this._knownHosts.length + 1;
  }

  // Essa função deve ser sobrescrita pelo cliente
  onConnection(socket, peerName) {
    throw Error('peer.onConnection não foi implementado');
  }

  // Essa função pode ser sobrescrita pelo cliente
  onDisconnect(socket, host) {}

  // Essa função deve ser sobrescrita pelo cliente
  onData(socket, P2PDataTemplate) {
    throw Error('peer.onData não foi implementado');
  }

  // Essa função pode ser sobrescrita pelo cliente
  onError(err, context) {
    console.warn('Peer.onError não foi implementado, erro não tratado:', err);
  }
}

module.exports = Peer;