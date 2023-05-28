import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import classNames from "classnames/bind";
import styles from "./login.module.scss";
import Header from "~/components/layouts/header"; 

const cx = classNames.bind(styles);

function LoginTeacher() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies();
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:9000/loginteacher", {
        username,
        password,
      })
      .then((res) => res.data)
      .then((data) => {
          setCookie("token", data.token, { path: "/" });
          setCookie("user", data.data[0], { path: "/" });
          navigate("/teacher");
      })
      .catch((err) => {
        navigate('/')
      });
  }
  return (
    <>
    <Header />
    <div className={cx('login')}>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <h2 className={cx('heading')}>Login</h2>
          <div className={cx('form-group')}>
            <label className={cx('form-label')}>Username:</label>
            <input
              className={cx('form-control')}
              placeholder="EX: email@gmail.com"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              name="username"
            />
            <span className={cx('form-message')}></span>
          </div>
          <div className={cx('form-group')}>
            <label className={cx('form-label')}>Password:</label>
            <input
              className={cx('form-control')}
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="username"
            />
            <span className={cx('form-message')}></span>
          </div>
          <button type="submit" className={cx('form-submit')}>Login</button>
      </form>
    </div>
    </>
  );
}

export default LoginTeacher;
