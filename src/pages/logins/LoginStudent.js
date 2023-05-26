import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import classNames from "classnames/bind";
import styles from "./login.module.scss";
import Header from "~/components/layouts/header";

const cx = classNames.bind(styles);

const LoginStudent = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập với username và password ở đây
    axios
      .post("http://localhost:9000/loginstudent", {
        username,
        password,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        if (data.data.length > 0) {
          setCookie("token", data.token, { path: "/" });
          console.log(data);
          navigate("/student");
        }
      })
      .catch((err) => {
        navigate("/");
      });
  };

  return (
    <div className={cx("wrapper")}>
      <Header/>
      <div className={cx('content')}>
        <h2>Login for Student</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>username:</label>
            <input
              className={cx('input')}
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              name="username"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              className={cx('input')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="username"
            />
          </div>
          <button className="submit" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginStudent;
