import axios from "axios";
import styles from "./add.module.scss";
import classNames from "classnames/bind";
import { useFormik, Field } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function AddCourse({ setShowAdd }) {
  const formik = useFormik({
    initialValues: {
      subjectId: "",
      semesterId: "",
      LectureId: "",
      name: "",
    },
    validationSchema: yup.object({
      subjectId: yup.string().required("Subject ID Required"),
      semesterId: yup.string().required("Semester ID Required"),
      LectureId: yup.string().required("Lecture ID Required"),
      name: yup.string().required("Name is Required"),
    }),
    onSubmit: async (values) => {
      try {
        const respone = await axios.post(`${backendURL}/course/add`, values);
        if (respone.data.status === 200) {
          setShowAdd(false);
        }

        console.log(respone.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const r1 = await axios.get(`${backendURL}/teacher/getall`);
        const r2 = await axios.get(`${backendURL}/semester/getall`);
        const r3 = await axios.get(`${backendURL}/subject/getAll`);

        return axios.all([r1, r2, r3]).then(
          axios.spread((r1, r2, r3) => {
            setSemesters(r2.data);
            setSubjects(r3.data);
            setTeachers(r1.data);
          })
        );
      }

      fetchData();
    } catch (error) {}
  }, []);

  return (
    <div className={cx("login")}>
      <form onSubmit={formik.handleSubmit} className={cx("form")}>
        <h2 className={cx("heading")}>Add Course</h2>
        <div className={cx("form-group")}>
          <label className={cx("form-label", "mb-2")}>Semester:</label>
          <select
            className={cx("form-select")}
            name="semesterId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.semesterId}
          >
            <option value="">Select Semester</option>
            {semesters.map((semester, i) => (
              <option key={i} value={semester.Id}>
                {semester.Year} {semester.Session}
              </option>
            ))}
          </select>
          {formik.errors.semesterId && formik.touched.semesterId && (
            <span className={cx("form-message")}>
              {formik.errors.semesterId}
            </span>
          )}
        </div>

        <div className={cx("form-group", "mb-2")}>
          <label className={cx("form-label")}>Subject:</label>
          <select
            className={cx("form-select")}
            name="subjectId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.subjectId}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject, i) => (
              <option key={i} value={subject.Id}>
                {subject.Name}
              </option>
            ))}
          </select>
          {formik.errors.subjectId && formik.touched.subjectId && (
            <span className={cx("form-message")}>
              {formik.errors.subjectId}
            </span>
          )}
        </div>

        <div className={cx("form-group", "mb-2")}>
          <label className={cx("form-label")}>Lecturer:</label>
          <select
            className={cx("form-select")}
            name="LectureId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.LectureId}
          >
            <option value="">Select Lecturer</option>
            {teachers.map((teacher, i) => (
              <option key={i} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
          {formik.errors.LectureId && formik.touched.LectureId && (
            <span className={cx("form-message")}>
              {formik.errors.LectureId}
            </span>
          )}
        </div>

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
        <button type="submit" className={cx("form-submit")}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
