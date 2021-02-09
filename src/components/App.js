import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import '../css/App.css';
import 'semantic-ui-css/semantic.min.css';
import '../css/styles.css';
function App() {
  return (
    <div>
      <Router>
        <Redirect exact from="/" to="login" />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
