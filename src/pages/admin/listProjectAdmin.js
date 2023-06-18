import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import Button from "~/components/button";
import AddProject from "../create/AddProject";

import styles from "./admin.module.scss";
import classNames from "classnames/bind";

import { Modal, Button as Btn } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";

const cx = classNames.bind(styles);

function ListProjectAdmin() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [isShowAdd, setShowAdd] = useState(false);

  const [projects, setProject] = useState([]);
  const [courses, setCourses] = useState([]);

  const [courID, setCourID] = useState(0);

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleEdit = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      notion: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Your name must be at least 5 characters long")
        .max(50, "Your name must be under 25 characters long")
        .required("Your name is required"),
      notion: yup.string().required("Your notion is required"),
    }),
    onSubmit: (values) => {
      async function fetchData() {
        values.id = editId;
        const response = await axios.put("/project/edit", values);
        if (response.data.status === 200) {
          setRerender(!rerender);
          formik.resetForm();
          handleClose();
        }
      }

      fetchData();
    },
  });

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/project/getall`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/course/getall`, {
        withCredentials: true,
      });

      return axios.all([req1, req2]).then(
        axios.spread((listproject, listCourse) => {
          // Xử lý response từ request1 và requests
          setProject(listproject.data);
          setCourses(listCourse.data);
        })
      );
    }

    fetchData();
  }, [rerender]);

  function handleChooseCour(courId) {
    setCourID(courId);
  }

  return (
    <>
      <div>
        <h2
          className="mt-3 mb-3"
          style={{
            textAlign: "center",
          }}
        >
          List projects
        </h2>
        <Button primary onClick={() => setShowAdd(!isShowAdd)}>
          {isShowAdd ? "View" : "Add"}
        </Button>
      </div>
      {isShowAdd ? (
        <AddProject setShowAdd={setShowAdd} />
      ) : (
        <>
          <div className="col-2">
            <select
              className={cx("form-select")}
              aria-label="Default select example"
              defaultValue={""}
              onClick={(e) => {
                handleChooseCour(e.target.value);
              }}
            >
              <option value="0">All Course</option>
              {courses.map((course, i) => {
                return (
                  <option value={course.id} key={i}>
                    {course.id}-{course.name}
                  </option>
                );
              })}
            </select>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Name</th>
                <th>Notion</th>
                <th>Edit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects
                .filter(function (item) {
                  if (parseInt(courID) === 0) return true;
                  else return parseInt(item.CourseId) === parseInt(courID);
                })
                .map((project, i) => (
                  <tr key={i}>
                    <td>{project.Id}</td>
                    <td>{project.Name}</td>
                    <td>{project.Notion}</td>
                    <td>
                      <Button onClick={() => handleEdit(project.Id)}>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button to={`/projectdetails/${project.Id}`}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              className={"form-control"}
              placeholder="Enter Name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name && (
              <span className={"form-message"}>{formik.errors.name}</span>
            )}
            <br />

            <label>Notion:</label>
            <input
              className={"form-control"}
              placeholder="Enter notion"
              type="text"
              name="notion"
              value={formik.values.notion}
              onChange={formik.handleChange}
            />
            {formik.errors.notion && formik.touched.notion && (
              <span className={"form-message"}>{formik.errors.notion}</span>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={formik.handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListProjectAdmin;
