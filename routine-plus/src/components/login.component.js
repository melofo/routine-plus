import React, { Component } from 'react';
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
          password: ''
        }
      }

      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      onSubmit(e) {
        const { username, password } = this.state;
        axios.post('http://localhost:5000/user/login', 
        {
            username: username,
            password: password
        }, { withCredentials: true })
          .then(res => {
            if (res.data.logged_in) {
              this.props.handleLogin(res.data.user);
              window.location = '/blocks';
            }
          });
        
        e.preventDefault();
        
      }    
    
    render() {
        return (
          <div>
            <h3>Login</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    name = "username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                <label>Password: </label>
                <input  type="password"
                    required
                    className="form-control"
                    name = "password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
              </div>
              <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary" />
              </div>
            </form>
          </div>
        
        )
    }
}