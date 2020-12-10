import React, {useState, useContext } from "react";
import UserContext from "../userContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
        <div className="page">
        {userData.user ? (
            <h1>Welcome {userData.user.username}</h1>
        ) : (
        
        <div>
            {/* register part */}
            <div className="page">
            <h1>Routine+</h1>
            <h2>Don't have an account? Sign up now!</h2>
            {error && (<div><span>{error}</span></div>)}
            <form className="form" onSubmit={RegisterSubmit}>
                <label htmlFor="register-username">please enter username</label>
                <input
                onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="register-password">please enter password</label>
                <input
                onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="register-passwordCheck">enter password again</label>
                <input
                onChange={(e) => setPasswordCheck(e.target.value)}
                />
                <input type="submit" value="Sign up" />
            </form>
            </div>

            {/* login part */}
            <div className="page">
            <h2>Already have an account? Log in now!</h2>
            {error && (<div><span>{error}</span></div>)}
            <form className="form" onSubmit={loginSubmit}>
                <label htmlFor="register-username">please enter username</label>
                <input
                onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="register-password">please enter password</label>
                <input
                onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Log in" />
            </form>
            </div>
        </div>
        )}
        </div>
    );
}