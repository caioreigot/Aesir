import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom' 

import Home from '@pages/Home';
import Configurations from '@pages/Configurations';
import PreGameRoom from '@pages/PreGameRoom';
import PlayRoom from '@pages/PlayRoom';
import Connect from '@pages/Connect';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/configurations">
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