import React, {Component} from 'react'
import Menu from './components/Menu.js'
import Home from './components/Home.js'
import Data from './components/Data.js'
import Dashboard from './components/Dashboard.js'
import About from './components/About.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Menu />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/data">
              <Data />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/about">
              <About />
            </Route>
        </Switch>  
      </Router>
    );
  }
}

export default App;
