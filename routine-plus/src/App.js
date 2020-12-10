import React,  { useState, useEffect }from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/home.component';
import BlocksList from "./components/blocks-list.component";
import EditBlock from "./components/edit-block.component";
import CreateBlock from "./components/create-block.component";
import UserContext from "./userContext";
import axios from "axios";


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
    window.location='/';
  };

  return (
    <div className="app">
      <Router>
      {userData.user ?(
        <button onClick={logout}>Log out</button>
      ):(<div></div>)}
      <UserContext.Provider value={{ userData, setUserData }}>
      <div className="container">
        <br/>
        <Route exact path="/" component={Home} />
        <Route path="/blocks" component={BlocksList} />
        <Route path="/edit/:id" component={EditBlock} />
        <Route path="/create" component={CreateBlock} />
      </div>
      </UserContext.Provider>
      </Router>
    </div>
  );
}