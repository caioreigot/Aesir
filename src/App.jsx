import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom' 

import Home from '@pages/Home/index';
import Configurations from '@pages/Configurations/index';
import PreGameRoom from '@pages/PreGameRoom/index';
import PlayRoom from '@pages/PlayRoom/index';
import Connect from '@pages/Connect/index';

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/configurations">
          <Configurations />
        </Route>
        <Route path="/pre-game-room">
          <PreGameRoom />
        </Route>
        <Route path="/play-room">
          <PlayRoom />
        </Route>
        <Route path="/connect">
          <Connect />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;