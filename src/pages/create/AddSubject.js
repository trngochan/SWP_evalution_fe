import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./add.module.scss";
import classNames from "classnames/bind";


const cx = classNames.bind(styles);
 

function AddSubject() {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      description: yup.string().required("Name is required"),
    }),
    onSubmit: (values) => {
        console.log(values)
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
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
            <span className={cx("form-message")}>{formik.errors.description}</span>
          )}
        </div>
        <button type="submit" className={cx("form-submit")}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddSubject;
