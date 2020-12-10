import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Typing from 'react-typing-animation';
import ImageFadeIn from "react-image-fade-in";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    handleLogoutClick() {
        axios
          .get("http://localhost:5000/user/logout", { withCredentials: true })
          .then(response => {
              if (response.data === "success!!!!!") {
                this.props.handleLogout();
                window.location = '/';
            }
          })
          .catch(error => {
            console.log("logout error", error);
          });
          
      }
    render() {
        return (
        <div>
            <div class="float-left">
            <h1>Home</h1>
            </div>
            
            <div class="float-right">
                {this.props.loggedInStatus === "LOGIN" ? <p>Welcome back! {this.props.user}</p> : <p></p>}
                {this.props.loggedInStatus === "NOTLOGIN"&&
                    <Link to="/login" className="nav-link">
                    <button class="btn btn-xs btn-primary">Log in</button>
                    </Link>
                }
                {this.props.loggedInStatus === "LOGIN" &&
                    <button class="btn btn-xs btn-primary" onClick={() => this.handleLogoutClick()}>Logout</button>
                }
            </div>
            <br></br>
            <div class = "container">
                <br></br>
                <br></br>
                <br></br>
                <Typing>
                {this.props.loggedInStatus === "LOGIN" ? <h3>Welcome to the Routine+!</h3> : <h3>Welcome to the Routine+!</h3>}
                <Typing.Delay ms={500} />
                <h3>We are a team of 4 CS major graduate students.</h3>
                <Typing.Delay ms={1000} />
                <h3>This site showcases some of our projects.</h3>
                <Typing.Delay ms={1000} />
                <h3>Feel free to explore and Have fun! :D</h3>
                </Typing>
                <br></br>
                <ImageFadeIn width={800} height={600} opacityTransition = {60} src={"https://images.unsplash.com/photo-1600132806608-231446b2e7af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80"} />

            </div>
        </div>
        
        )
    }

}