import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Account from './Account';
import Registration from './Registration';

import '../css/App.css';
import 'semantic-ui-css/semantic.min.css';
import '../css/styles.css';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/home" component={Home} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/" component={Login} />
      </Router>
    </div>
  );
}

export default App;
