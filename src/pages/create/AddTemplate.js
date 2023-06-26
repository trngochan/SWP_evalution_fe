import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./add.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AddTemplate({
  errorTemplate,
  onUpdataDataTemplate,
  onSetShowScoreDetails,
  subjects,
}) {
  const subjectId = ["subject1", "subject2"];

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      subjectId: "",
      status: "",
      applydate: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      id: yup.number().required("ID is required"),
      subjectId: yup.string().required("Subject ID is required"),
      status: yup.string().required("Status is required"),
      applydate: yup.date().required("Apply date is required"),
    }),
    onSubmit: (values) => {
      onUpdataDataTemplate(values);
      onSetShowScoreDetails(true);
    },
  });

  return (
    <div className={cx("login")}>
      <form onSubmit={formik.handleSubmit} className={cx("form")}>
        <h2 className={cx("heading")}>Add Template</h2>
        <div className={cx("form-group")}>
          <label className={cx("form-label")}>ID:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter id"
            type="number"
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
          />
          {formik.errors.id && formik.touched.id && (
            <span className={cx("form-message")}>{formik.errors.id}</span>
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

        <div className={cx("form-group")}>
          <label className={cx("form-label", "mb-2")}>Subject Id:</label>
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
                {subject.Id} - {subject.Name}
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
          <label className={cx("form-label")}>Status:</label>
          <input
            min={0}
            max={1}
            className={cx("form-control")}
            placeholder="Enter status"
            type="number"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          />
          {formik.errors.status && formik.touched.status && (
            <span className={cx("form-message")}>{formik.errors.status}</span>
          )}
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label")}>Apply Date:</label>
          <input
            className={cx("form-control")}
            placeholder="Enter applydate"
            type="date"
            name="applydate"
            value={formik.values.applydate}
            onChange={formik.handleChange}
          />
          {formik.errors.applydate && formik.touched.applydate && (
            <span className={cx("form-message")}>
              {formik.errors.applydate}
            </span>
          )}
        </div>
        {errorTemplate && (
          <span
            style={{
              color: "red",
            }}
          >
            {errorTemplate}
          </span>
        )}
        <button type="submit" className={cx("form-submit")}>
          Next
        </button>
      </form>
    </div>
  );
}

export default AddTemplate;
