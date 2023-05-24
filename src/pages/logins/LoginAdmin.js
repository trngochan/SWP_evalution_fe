import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function LoginAdmin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies("token");
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:9000/loginadmin", {
        username,password
      })
      .then((res) => res.data)
      .then((data) => {
        if(data.data.length > 0) {
          setCookie('token', data.token, {path: '/'});
        }
        if(data.data.length > 0) navigate('/student')
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            name="username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="username"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginAdmin;
