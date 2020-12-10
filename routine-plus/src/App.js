import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/home.component';
import Login from './components/login.component';
import BlocksList from "./components/blocks-list.component";
import EditBlock from "./components/edit-block.component";
import CreateBlock from "./components/create-block.component";
import Welcome from "./components/welcome.component";
import axios from "axios";


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: "NOTLOGIN",
      user: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  checkLoginStatus() {
    axios
      .get("http://localhost:5000/user", {withCredentials: true})
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOTLOGIN"
        ) {
          this.setState({
            loggedInStatus: "LOGIN",
            user: response.data.user
          });
        } else if (!response.data.logged_in & this.state.loggedInStatus === "LOGIN") {
          this.setState({
            loggedInStatus: "NOTLOGIN",
            user: {}
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
      
  }
  componentDidMount() {
    this.checkLoginStatus();
  }
  handleLogout() {
    this.setState({
      loggedInStatus: "NOTLOGIN",
      user: {}
    });
  }
  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGIN",
      user: data
    });
  }
  render() {
    return (
      <div className="app">
        <Router>
        <div className="container">
          <br/>
          <Route exact path="/" render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}/>
          <Route path="/login" render={props => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}/>
          <Route path="/blocks" render={props => (
                <BlocksList
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
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