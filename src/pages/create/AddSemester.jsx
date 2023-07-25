import { useFormik } from "formik";
import * as yup from "yup";
import classNames from "classnames/bind";
import axios from "axios";
import styles from "./add.module.scss";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function AddSemester({ rerender }) {
  const formik = useFormik({
    initialValues: {
      year: "",
      session: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: yup.object({
      year: yup.number().required("Year is required"),
      session: yup.string().required("Session is required"),
      startTime: yup.date().required("Start Time is required"),
      endTime: yup.date().required("End Time is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${backendURL}/semester/add`, values)
        .then((res) => res.data)
        .then((data) => {
          // formik.resetForm();
          if (data.status === 200) {
            setOpenSnackBarSuccess(true);
            rerender((prev) => !prev);
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState(false);
  function closeSnackbarSuccess() {
    setOpenSnackBarSuccess(false);
  }

  return (
    <div className={cx("login")}>
      <form onSubmit={formik.handleSubmit} className={cx("form")}>
        <h2 className={cx("heading")}>Add Semester</h2>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Year:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter year"
            type="text"
            name="year"
            value={formik.values.year}
            onChange={formik.handleChange}
          />
          {formik.errors.year && formik.touched.year && (
            <span className={cx("form-message")}>{formik.errors.year}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Session:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter session"
            type="text"
            name="session"
            value={formik.values.session}
            onChange={formik.handleChange}
          />
          {formik.errors.session && formik.touched.session && (
            <span className={cx("form-message")}>{formik.errors.session}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Start Time:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter year"
            type="date"
            name="startTime"
            value={formik.values.startTime}
            onChange={formik.handleChange}
          />
          {formik.errors.startTime && formik.touched.startTime && (
            <span className={cx("form-message")}>
              {formik.errors.startTime}
            </span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>End Time:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter year"
            type="date"
            name="endTime"
            value={formik.values.endTime}
            onChange={formik.handleChange}
          />
          {formik.errors.endTime && formik.touched.endTime && (
            <span className={cx("form-message")}>{formik.errors.endTime}</span>
          )}
        </div>
        <button type="submit" className={cx("form-submit")}>
          Add
        </button>
      </form>
      <Snackbar
        open={openSnackBarSuccess}
        autoHideDuration={3000}
        onClose={closeSnackbarSuccess}
      >
        <Alert severity="success">Add template successfully</Alert>
      </Snackbar>
    </div>
  );
}

export default AddSemester;
