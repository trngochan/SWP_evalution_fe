import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import classNames from "classnames/bind";
import styles from "./add.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function AddTeacherList() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      birthday: "",
      phone: "",
      address: "",
      username: "",
      password: "",
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
      phone: Yup.string().required("Your phone number is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${backendURL}/teacher/add`, values)
        .then((res) => res.data)
        .then((data) => {
          if (data.status === 200) {
            setError("");
            setSucess(data.message);
            navigate("/admin");
            formik.resetForm();
          } else {
            setSucess("");
            setError(data.message);
          }
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <div className={cx("login")}>
        <form onSubmit={formik.handleSubmit} className={cx("form")}>
          <h2 className={cx("heading")}>Add Teacher</h2>
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
              value={formik.values.birthday}
              onChange={formik.handleChange}
              name="birthday"
            />
            {formik.errors.birthday && formik.touched.birthday && (
              <span className={cx("form-message")}>
                {formik.errors.birthday}
              </span>
            )}
          </div>
          <div className={cx("form-group")}>
            <label className={cx("form-label")}>Phone Number:</label>
            <input
              className={cx("form-control")}
              placeholder="Enter phone number"
              type="number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              name="phone"
            />
            {formik.errors.phone && formik.touched.phone && (
              <span className={cx("form-message")}>{formik.errors.phone}</span>
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
              <span className={cx("form-message")}>
                {formik.errors.address}
              </span>
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
              <span className={cx("form-message")}>
                {formik.errors.username}
              </span>
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
              <span className={cx("form-message")}>
                {formik.errors.password}
              </span>
            )}
          </div>
          {error.length > 0 && <p>{error}</p>}
          {sucess.length > 0 && <p>{sucess}</p>}
          <button type="submit" className={cx("form-submit")}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTeacherList;
