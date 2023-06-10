import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./add.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function AddProject() {
  const cousreId = ["course1", "course2"];
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      notion: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      notion: yup.string().required("Notion is required"),
    }),
    onSubmit: (values) => {
      // axios
      //   .post("/project/add", values)
      //   .then((res) => res.data)
      //   .then((data) => {
      //     console.log(data);
      //     if (data.status === 200) {
      //       setMessage(data.message);
      //       formik.resetForm();
      //     } else {
      //       setMessage(data.message);
      //     }
      //   });
    },
  });

  // useEffect(() => {
  //   try {
  //     async function fetchData() {
  //       const r1 = await axios.get("/course/getall");

  //       return axios.all([r1]).then(
  //         axios.spread((r1) => {
  //           setCourses(r1.data);
  //         })
  //       );
  //     }

  //     fetchData();
  //   } catch (error) {}
  // }, []);

  return (
    <div className={cx("login")}>
      <form onSubmit={formik.handleSubmit} className={cx("form")}>
        <h2 className={cx("heading")}>Add Project</h2>

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
          <label className={cx("form-label")}>Notion:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter notion"
            type="text"
            name="notion"
            value={formik.values.notion}
            onChange={formik.handleChange}
          />
          {formik.errors.notion && formik.touched.notion && (
            <span className={cx("form-message")}>{formik.errors.notion}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label", "mb-2")}>Course Id:</label>
          <select
            className={cx("form-select")}
            name="cousreId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.cousreId}
          >
            <option value="" defaultValue>Select Course Id</option>
            {courses.map((item, i) => (
              <option key={i} value={item.id}>
                {item.id} - {item.name}
              </option>
            ))}
          </select>
        </div>
        {message.length > 0 && <p>{message}</p>}
        <button type="submit" className={cx("form-submit")}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddProject;
