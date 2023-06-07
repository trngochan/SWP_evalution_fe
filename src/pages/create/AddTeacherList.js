import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import classNames from "classnames/bind";
import styles from "./add.module.scss";

const cx = classNames.bind(styles);

function AddTeacherList() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  // const navigate = useNavigate();

  // const [cookies, setCookie, removeCookie] = useCookies("token");
  function handleSubmit(event) {
  //   event.preventDefault();

  //   axios
  //     .post("/loginteacher", {
  //       username,
  //       password,
  //     })
  //     .then((res) => res.data)
  //     .then((data) => {
  //       if (data.data.length > 0) {
  //         setCookie("token", data.token, { path: "/" });
  //       }
  //       if (data.data.length > 0) navigate("/teacher");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  }
  return (
    <>
    <div className={cx('login')}>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <h2 className={cx('heading')}>Add Teacher</h2>
          <div className={cx('form-group')}>
            <label className={cx('form-label')}>Name:</label>
            <input
              className={cx('form-control')}
              placeholder="Enter Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="username"
            />
          </div>
          <div className={cx('form-group')}>
            <label className={cx('form-label')}>Birthday:</label>
            <input
              className={cx('form-control')}
              type="date"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="username"
            />
          </div>
          <div className={cx('form-group')}>
            <label className={cx('form-label')}>Phone Number:</label>
            <input
              className={cx('form-control')}
              placeholder="Enter Name"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              name="username"
            />
          </div>
          
          <div className={cx('form-group')}>
            <label className={cx('form-label')}>Address:</label>
            <input
              className={cx('form-control')}
              placeholder="Enter Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="username"
            />
          </div>
          <div className={cx('form-group')}>
            <label className={cx('form-label')}>Username:</label>
            <input
              className={cx('form-control')}
              placeholder="Enter Username"
              type="password"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
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
          </div>
          <div className={cx('form-group')}>
            <label className={cx('form-label')}>Role:</label>
            <input
              className={cx('form-control')}
              placeholder="Enter Role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              name="username"
            />
          </div>
          <button type="submit" className={cx('form-submit')}>Add</button>
      </form>
    </div>
    </>
  );
}

export default AddTeacherList;
