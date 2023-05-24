import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const LoginStudent = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies('token');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập với username và password ở đây
    axios
      .post("http://localhost:9000/loginstudent", {
        username,password
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data)
        if(data.data.length > 0) {
          setCookie('token', data.token, {path: '/'});
          navigate('/student')
        }
        
      })
      .catch((err) => {
        navigate('/');
      });
  };

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
};

export default LoginStudent;
