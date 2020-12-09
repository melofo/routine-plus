import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./components/welcome.component";


export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
        <div className="container">
          {/* this one is for test, delete it when you code */}
          <Route exact path="/" component={Welcome} />
        </div>
        </Router>
      </div>
    );
  }
}