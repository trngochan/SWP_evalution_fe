import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./add.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useState } from "react";

const cx = classNames.bind(styles);

function AddSubject() {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      description: yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const respone = await axios.post("/subject/add", values);
        const data = respone.data;
        if (data.status === 200) {
          setMessage(data.message);
          formik.resetForm();
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className={cx("login")}>
      <form onSubmit={formik.handleSubmit} className={cx("form")}>
        <h2 className={cx("heading")}>Add Subject</h2>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Name:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter name"
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
          <label className={cx("form-label")}>Description:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter description"
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description && (
            <span className={cx("form-message")}>
              {formik.errors.description}
            </span>
          )}
        </div>
        <button type="submit" className={cx("form-submit")}>
          Add
        </button>
        {message.length > 0 && <p>{message}</p>}
      </form>
    </div>
  );
}

export default AddSubject;
