import React from "react";



const logout = () => {
    
    localStorage.setItem("auth-token", "");
    window.location='/';
  };
export default function Home() {
    return(
        <button onClick={logout}>Log out</button>
    );
}