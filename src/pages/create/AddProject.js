import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./add.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function AddProject({ setShowAdd, setRerender }) {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      notion: "",
      courseId: "",
      semester: "",
      subject: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      notion: yup.string().required("Notion is required"),
      courseId: yup.string().required("Course ID is required"),
      semester: yup.string().required("Semester ID is required"),
      subject: yup.string().required("Subject is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${backendURL}${backendURL}/project/add`, values)
        .then((res) => res.data)
        .then((data) => {
          if (data.status === 200) {
            setRerender((prev) => !prev);
            setShowAdd(false);
            formik.resetForm();
          } else {
            setMessage(data.message);
          }
        });
    },
  });

  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    try {
      async function fetchData() {
        const r2 = await axios.get(`${backendURL}/semester/getall`);
        const r3 = await axios.get(`${backendURL}/subject/getAll`);

        return axios.all([r2, r3]).then(
          axios.spread((r2, r3) => {
            setSemesters(r2.data);
            setSubjects(r3.data);
          })
        );
      }

      fetchData();
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      if (formik.values.semester != 0 && formik.values.subject != 0) {
        async function fetchData() {
          const r = await axios.get(
            `/course/${formik.values.semester}/${formik.values.subject}`
          );

          return axios.all([r]).then(
            axios.spread((r1) => {
              setCourses(r1.data.data);
            })
          );
        }

        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  }, [formik.values.semester, formik.values.subject]);

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
          <label className={cx("form-label", "mb-2")}>Semester:</label>
          <select
            className={cx("form-select")}
            name="semester"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.semester}
          >
            <option value={0} defaultValue>
              Select semester
            </option>
            {semesters.map((item, i) => {
              return (
                <option key={i} value={item.Id}>
                  {item.Year} - {item.Session}
                </option>
              );
            })}
          </select>
          {formik.errors.semester && formik.touched.semester && (
            <span className={cx("form-message")}>{formik.errors.semester}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label", "mb-2")}>Subject:</label>
          <select
            className={cx("form-select")}
            name="subject"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.subject}
          >
            <option value={0} defaultValue>
              Select subject
            </option>
            {subjects.map((item, i) => {
              return (
                <option key={i} value={item.Id}>
                  {item.Id} - {item.Name}
                </option>
              );
            })}
          </select>
          {formik.errors.subject && formik.touched.subject && (
            <span className={cx("form-message")}>{formik.errors.subject}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label", "mb-2")}>Course Id:</label>
          <select
            className={cx("form-select")}
            name="courseId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.courseId}
          >
            <option value="" defaultValue>
              Select Course Id
            </option>
            {courses.map((item, i) => {
              {
                /* const semmester = semesters.find((s) => s.Id == item.SemesterId);
              const subject = subjects.find((s) => s.Id == item.SubjectId);
              console.log(semesters); */
              }
              return (
                <option key={i} value={item.id}>
                  {item.id} - {item.name}
                </option>
              );
            })}
          </select>
          {formik.errors.courseId && formik.touched.courseId && (
            <span className={cx("form-message")}>{formik.errors.courseId}</span>
          )}
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
