<<<<<<< HEAD
import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
=======
import React,  { useState, useEffect }from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
//frontend
>>>>>>> changed layout of home page, added hover effects, focus effect
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Home from './components/home.component';
import BlocksList from "./components/blocks-list.component";
import EditBlock from "./components/edit-block.component";
import CreateBlock from "./components/create-block.component";
import UserContext from "./userContext";
import axios from "axios";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  // this is used to initialize a token in localStorage and when "auth-token" in localStorage changes, set userData
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    window.location = '/';
  };

  return (
    <div className="app">
      <Router>
        {/* Only show Log Out on navbar when logged in */}
        {userData.user ? (
          <Fragment>
            <Navbar className="navbar" expand="lg">
              <Navbar.Brand className="navbar-brand">Routine+ <span style={{ color: "#08deff" }}>{userData.user.username}</span></Navbar.Brand>
              <Navbar.Toggle className="custom-toggler" aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <Nav.Link href="#logOut" onClick={logout}>Log Out</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Fragment>
        ) :
          <Fragment>
            <Navbar className="navbar" expand="lg">
              <Navbar.Brand className="navbar-brand">Routine+</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
            </Navbar>
          </Fragment>
        }

        {/* once you login, you could never go to login page until you logout */}
        {userData.user ? (
          <>
            {/* <button onClick={logout}>Log out</button> */}
            <UserContext.Provider value={{ userData, setUserData }}>
              <div className="container">
                <br />
                <Route exact path="/" component={BlocksList} />
                <Route path="/blocks" component={BlocksList} />
                <Route path="/edit/:id" component={EditBlock} />
                <Route path="/create" component={CreateBlock} />
              </div>
            </UserContext.Provider>
          </>
        ) : (<div>
          <UserContext.Provider value={{ userData, setUserData }}>
            <div className="hello">
              <Route exact path="/" component={Home} />
            </div>
          </UserContext.Provider>
        </div>)}

      </Router>
    </div>
  );
}
