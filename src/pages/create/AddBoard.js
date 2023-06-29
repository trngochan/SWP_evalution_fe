import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./add.module.scss";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const cx = classNames.bind(styles);

function AddBoard() {
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      semesterId: "",
      subjectId: "",
      templateId: "",
      startTime: "",
      endTime: "",
      room: "",
      date: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      semesterId: yup.string().required("Subject ID is required"),
      subjectId: yup.string().required("Subject ID is required"),
      templateId: yup.string().required("Template ID is required"),
      startTime: yup.string().required("Start Time required"),
      endTime: yup.string().required("End Time required"),
      room: yup.number().required("Room is required"),
      date: yup.date().required("Date is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      values.date = moment(values.date).format("YYYY-MM-DD");
      const respone = await axios.post("/evalution/add", values);
      const data = respone.data;
      if (data.status === 201) {
        resetForm();
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    },
  });

  // const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        // const r1 = await axios.get("/teacher/getall");
        const r2 = await axios.get("/semester/getall");
        const r3 = await axios.get("/subject/getAll");
        const r4 = await axios.get("/template/getall");

        return axios.all([r2, r3, r4]).then(
          axios.spread((r2, r3, r4) => {
            setSemesters(r2.data);
            // setSubjects(r3.data);
            setSubjects(r3.data);
            setTemplates(r4.data);
          })
        );
      }

      fetchData();
    } catch (error) {}
  }, []);

  return (
    <div className={cx("login")}>
      <form onSubmit={formik.handleSubmit} className={cx("form")}>
        <h2 className={cx("heading")}>Add Board</h2>

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
          <label className={cx("form-label")}>Room:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter room"
            type="text"
            name="room"
            value={formik.values.room}
            onChange={formik.handleChange}
          />
          {formik.errors.room && formik.touched.room && (
            <span className={cx("form-message")}>{formik.errors.room}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label", "mb-2")}>Semester Id:</label>
          <select
            className={cx("form-select")}
            name="semesterId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.semesterId}
          >
            <option value="">Select Semester Id</option>
            {semesters.map((item, i) => (
              <option key={i} value={item.Id}>
                {item.Year}-{item.Session}
              </option>
            ))}
          </select>
          {formik.errors.semesterId && formik.touched.semesterId && (
            <span className={cx("form-message")}>
              {formik.errors.semesterId}
            </span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label", "mb-2")}>Subject Id:</label>
          <select
            className={cx("form-select")}
            name="subjectId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.subjectId}
          >
            <option value="">Select Subject Id</option>
            {subjects.map((item, i) => (
              <option key={i} value={item.Id}>
                {item.Id}-{item.Name}
              </option>
            ))}
          </select>
          {formik.errors.subjectId && formik.touched.subjectId && (
            <span className={cx("form-message")}>
              {formik.errors.subjectId}
            </span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label", "mb-2")}>Template:</label>
          <select
            className={cx("form-select")}
            name="templateId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.templateId}
          >
            <option value="">Select Template Id</option>
            {templates.map((item, i) => (
              <option key={i} value={item.Id}>
                {item.Id}-{item.Name}
              </option>
            ))}
          </select>
          {formik.errors.templateId && formik.touched.templateId && (
            <span className={cx("form-message")}>
              {formik.errors.templateId}
            </span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Start Time:</label>
          <input
            className={cx("form-control")}
            type="time"
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
            type="time"
            name="endTime"
            value={formik.values.endTime}
            onChange={formik.handleChange}
          />
          {formik.errors.endTime && formik.touched.endTime && (
            <span className={cx("form-message")}>{formik.errors.endTime}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Date:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter date"
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          {formik.errors.date && formik.touched.date && (
            <span className={cx("form-message")}>{formik.errors.date}</span>
          )}
        </div>
        <button type="submit" className={cx("form-submit")}>
          Add
        </button>
        {message.length > 0 && (
          <p
            style={{
              color: "red",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default AddBoard;
