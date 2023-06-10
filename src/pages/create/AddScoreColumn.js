import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./add.module.scss";
import classNames from "classnames/bind";


const cx = classNames.bind(styles);


function AddScoreColumn() {
    const templateId = ["template1", "template2"];

    const formik = useFormik({
        initialValues: {
            id: "",
            name: "",
            percent: "",
            templateId: "",
        },
        validationSchema: yup.object({
          id: yup.number().required("ID is required"),
          name: yup.string().required("Name is required"),
          percent: yup.number().required("Percent is required"),
          templateId: yup.string().required("Template Id is required"),
        }),
        onSubmit: (values) => {
            console.log(values)
        },
      });

    return ( 
        <div className={cx("login")}>
      <form onSubmit={formik.handleSubmit} className={cx("form")}>
      <h2 className={cx("heading")}>Add Score Column</h2>
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
            <label className={cx("form-label")}>Percent:</label>
            <div className={cx("percent-input")}>
                <input
                className={cx("form-control", "percent-input-field")}
                placeholder="Enter percent"
                type="number"
                name="percent"
                step="0.01"
                value={formik.values.percent}
                onChange={formik.handleChange}
                />
                <span className={cx("percent-symbol")}>%</span>
            </div>
            {formik.errors.percent && formik.touched.percent && (
                <span className={cx("form-message")}>{formik.errors.percent}</span>
            )}
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label", "mb-2")}>Template Id:</label>
          <select
            className={cx('form-select')}
            name="templateId"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.templateId}
          >
            <option value="">Select Template Id</option>
            {templateId.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          {formik.errors.templateId && formik.touched.templateId && (
            <span className={cx("form-message")}>{formik.errors.templateId}</span>
          )}
        </div>
      
        <button type="submit" className={cx("form-submit")}>
          Add
        </button>
      </form>
    </div>
    );
}

export default AddScoreColumn;