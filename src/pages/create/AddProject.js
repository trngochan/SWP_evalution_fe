import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./add.module.scss";
import classNames from "classnames/bind";


const cx = classNames.bind(styles);


function AddProject() {
    const cousreId = ["course1", "course2",];

    const formik = useFormik({
        initialValues: {
            id: "",
            cousreId: "",
            name: "",
            notion: "",
        },
        validationSchema: yup.object({
          id: yup.number().required("ID is required"),
          name: yup.string().required("Name is required"),
          notion: yup.string().required("Notion is required"),
          courseId: yup.string().required("Course Id is required"),
        }),
        onSubmit: (values) => {
            console.log(values)
        },
      });

    return ( 
        <div className={cx("login")}>
      <form onSubmit={formik.handleSubmit} className={cx("form")}>
      <h2 className={cx("heading")}>Add Project</h2>
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
    className={cx('form-select')}
    name="courseId" 
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.courseId} 
  >
    <option value="">Select Course Id</option>
    {cousreId.map((item, i) => (
      <option key={i} value={item}>
        {item}
      </option>
    ))}
  </select>
  {formik.errors.courseId && formik.touched.courseId && (
    <span className={cx("form-message")}>{formik.errors.courseId}</span>
  )}
</div>

        
        <button type="submit" className={cx("form-submit")}>
          Add
        </button>
      </form>
    </div>
    );
}

export default AddProject;