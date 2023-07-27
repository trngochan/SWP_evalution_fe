import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./add.module.scss";
import classNames from "classnames/bind";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function AddStudentList() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      code: "",
      name: "",
      address: "",
      birthday: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Your name must be at least 5 characters long")
        .max(25, "Your name must be under 25 characters long")
        .required("Your name is required"),
      address: Yup.string().required("Your address is required"),
      username: Yup.string()
        .min(5, "Your username must be at least 5 characters long")
        .required("Your username is required"),
      birthday: Yup.date().required("Your birthday is required"),
      password: Yup.string()
        .min(5, "Your password must be at least 5 characters long")
        .required("Your password is required"),
      code: Yup.string()
        .min(5, "Your code must be at least 5 characters long")
        .required("Your code is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${backendURL}/student/add`, values)
        .then((res) => res.data)
        .then((data) => {
          if (data.status === 200) {
            setError("");
            setSucess(data.message);
            formik.resetForm();
          } else {
            setSucess("");
            setError(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <div className={cx("login")}>
      <form onSubmit={formik.handleSubmit} className={cx("form")}>
        <h2 className={cx("heading")}>Add Student</h2>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Code:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter code"
            type="text"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
          />
          {formik.errors.code && formik.touched.code && (
            <span className={cx("form-message")}>{formik.errors.code}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Name:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter Name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <span className={cx("form-message")}>{formik.errors.name}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Birthday:</label>
          <input
            className={cx("form-control")}
            type="date"
            name="birthday"
            value={formik.values.birthday}
            onChange={formik.handleChange}
          />
          {formik.errors.birthday && formik.touched.birthday && (
            <span className={cx("form-message")}>{formik.errors.birthday}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Address:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter Address"
            type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            name="address"
          />
          {formik.errors.address && formik.touched.address && (
            <span className={cx("form-message")}>{formik.errors.address}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Username:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter Username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            name="username"
          />
          {formik.errors.username && formik.touched.username && (
            <span className={cx("form-message")}>{formik.errors.username}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Password:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <span className={cx("form-message")}>{formik.errors.password}</span>
          )}
        </div>
        {error.length > 0 && (
          <span className={cx("form-message")}>{error}</span>
        )}
        {sucess.length > 0 && (
          <span className={cx("form-message")}>{sucess}</span>
        )}
        <button type="submit" className={cx("form-submit")}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddStudentList;
