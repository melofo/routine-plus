import React, {useState, useContext } from "react";
import UserContext from "../userContext";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

//front end
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Styles from './styling/home.scss';
//front end logo
import Logo from "./images/logo.png";
import Image from 'react-bootstrap/Image'



export default function Home() {
    const { userData, setUserData } = useContext(UserContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();
    const history = useHistory();
    // register
    const RegisterSubmit = async (e) => {
        e.preventDefault();
        try {
        const newUser = { username, password, passwordCheck};
        await axios.post("http://localhost:5000/user/register", newUser, { withCredentials: true });
        const loginRes = await axios.post("http://localhost:5000/user/login", {
            username,
            password,
        });
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);

        history.push("/blocks");
        } catch (err) {
            console.log(err);
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    // login
    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
        const loginUser = { username, password };
        const loginRes = await axios.post(
            "http://localhost:5000/user/login",
            loginUser
        );
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/blocks");
        } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return (

      <Row className="no-gutters">
        <Col className="no-gutters">
        <div className="right-top d-flex justify-content-center align-items-center" tabindex="2">





          <Form onSubmit={loginSubmit} className="login-button">
            <Form.Group controlId="formBasicUserName">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="btn-neon" type="submit">
              Sign In
            </Button>
            <div className="error-message-1">{error && (<div><span>{error}</span></div>)} </div>
          </Form>

          <h3 className="regular-text"> Existing User</h3>
        </div>

        </Col>


        <Col className="no-gutters">

        <div className="right-bottom d-flex justify-content-center align-items-center" tabindex="2">


            <Form onSubmit={RegisterSubmit} className="signup-button">
              <Form.Group controlId="formBasicUserName">
                <Form.Label>New Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Set Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                 />
                <Form.Text className="text-muted">
                  Never share your password with anyone. Not even your boyfriend.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formPasswordConfirm">
                <Form.Label>Re-Enter Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                 />
              </Form.Group>
              <Button variant="primary" className="btn-neon" type="submit">
                Sign Up
              </Button>
              <div className="error-message-2">{error && (<div><span>{error}</span></div>)} </div>
            </Form>

          <h3 className="regular-text"> New User</h3>
        </div>
        </Col>
      </Row>

    );
}
