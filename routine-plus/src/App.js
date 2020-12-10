import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/home.component';
import BlocksList from "./components/blocks-list.component";
import EditBlock from "./components/edit-block.component";
import CreateBlock from "./components/create-block.component";
import axios from "axios";


export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
        <div className="container">
          <br/>
          <Route exact path="/" render={props => (
                <Home
                  {...props}
                />
              )}/>
          <Route path="/blocks" render={props => (
                <BlocksList
                  {...props}
                />
              )}/>
          <Route path="/edit/:id" component={EditBlock} />
          <Route path="/create" component={CreateBlock} />
        </div>
        </Router>
      </div>
    );
  }
}