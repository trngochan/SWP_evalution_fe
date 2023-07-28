import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faKey } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { Header } from "~/components/layouts/header";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

const LoginStudent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (document.cookie.includes("user")) {
      navigate("/student");
    } else {
      setIsLoading(false); // Kiểm tra user đã hoàn thành, set isLoading thành false
    }
  }, []);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(1);
    // Xử lý đăng nhập với username và password ở đây
    axios
      .post(`${backendURL}/loginstudent`, {
        username,
        password,
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.data.status === 200) {
          setCookie("token", data.token, { path: "/" });
          setCookie("user", data.data.data[0], { path: "/" });
          navigate("/student");
        } else {
          setError(data.data.message);
        }
      })
      .catch((err) => {
        navigate("/");
      });
  };

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị trạng thái chờ
  }

  return (
    <>
      <Header />
      <div className={cx("login")}>
        <form onSubmit={handleSubmit} className={cx("form")}>
          <h2 className={cx("heading")}>Login</h2>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>
              <FontAwesomeIcon icon={faUserTie} className={cx("icon-user")} />{" "}
              Username:
            </label>
            <input
              className={cx("form-control")}
              placeholder="EX: email@gmail.com"
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              name="username"
            />
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>
              <FontAwesomeIcon icon={faKey} className={cx("icon-password")} />{" "}
              Password:
            </label>
            <input
              className={cx("form-control")}
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="username"
            />
            <span className={cx("form-message")}></span>
          </div>
          {error.length > 0 && (
            <p
              style={{
                color: "red",
              }}
            >
              {error}
            </p>
          )}
          <button type="submit" className={cx("form-submit")}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginStudent;
