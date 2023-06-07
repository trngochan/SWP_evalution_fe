import { useFormik } from "formik";
import * as yup from "yup";
import classNames from "classnames/bind";
import axios from "axios";
import styles from "./add.module.scss";

const cx = classNames.bind(styles);

function AddSemester() {
  const formik = useFormik({
    initialValues: {
      year: "",
      session: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: yup.object({
      year: yup.number().required("Is required"),
      session: yup.string().required("Is required"),
      startTime: yup.date().required("Is required"),
      endTime: yup.date().required("Is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("/student/add", values)
        .then((res) => res.data)
        .then((data) => {
          // navigate("/admin");
          console.log("thanh cong");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

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
            <span className={cx("form-message")}>{formik.errors.startTime}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>End Time:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter year"
            type="tedatext"
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
    </div>
  );
}

export default AddSemester;
