import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BoardHeader from "~/components/headeritem";

import Button from "~/components/button";
import AddProject from "../create/AddProject";
import { Link } from "react-router-dom";

import styles from "./admin.module.scss";
import classNames from "classnames/bind";

import { Modal, Button as Btn } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function ListProjectAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const [projects, setProject] = useState([]);
  const [courses, setCourses] = useState([]);

  const [courID, setCourID] = useState(0);

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [idDelete, setIdDelete] = useState(0);

  const handleClickDelete = (id) => {
    setIdDelete(id);
    setShowConfirm(true);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowConfirm(false);
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
        const response = await axios.put(`${backendURL}/project/edit`, values);
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
      const req1 = await axios.get(`${backendURL}/project/getall`, {});
      const req2 = await axios.get(`${backendURL}/course/getall`, {});
      const req3 = await axios.get(`${backendURL}/semester/getall`, {});
      const req4 = await axios.get(`${backendURL}/subject/getall`);

      return axios.all([req1, req2, req3, req4]).then(
        axios.spread((listproject, listCourse, listSemester, listSubjects) => {
          // Xử lý response từ request1 và requests
          setProject(listproject.data);
          setCourses(listCourse.data);
          setSemesters(listSemester.data);
          setSubjects(listSubjects.data);
        })
      );
    }

    fetchData();
  }, [rerender]);

  function handleChooseCour(courId) {
    setCourID(courId);
  }

  async function handleDelete() {
    const req3 = await axios.delete(`${backendURL}/project/${idDelete}`);
    if (req3.data.status === 200) {
      setRerender(!rerender);
      setShowConfirm(false);
      toast.success("Delele successfully");
    }
  }

  return (
    <div className={cx("container")}>
      <div>
        <div className={cx("container-header")}>
          <BoardHeader message={"Projects"} />
          <div className={cx("btns")}>
            <Button active onClick={() => setShowAdd(!isShowAdd)}>
              {isShowAdd ? "View" : "+Add"}
            </Button>
          </div>
        </div>
      </div>
      {isShowAdd ? (
        <AddProject setRerender={setRerender} setShowAdd={setShowAdd} />
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
                    {course?.id}-{course?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <Table bordered hover>
            <thead className="text-center">
              <tr>
                <th>ID</th>
                <th>Semester</th>
                <th>Subject</th>
                <th>Course</th>
                <th>Name</th>
                {/* <th>Notion</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects
                .filter(function (item) {
                  if (parseInt(courID) === 0) return true;
                  else return parseInt(item.CourseId) === parseInt(courID);
                })
                .map((project, i) => {
                  const cournow = courses.find(
                    (course) => course.id === project.CourseId
                  );
                  const sub = subjects.find(
                    (subject) => subject.Id === cournow.SubjectId
                  );
                  console.log(sub);
                  const sem = semesters.find(
                    (sem) => sem.Id === cournow.SemesterId
                  );
                  return (
                    <tr key={i}>
                      <td className="text-center">{project.Id}</td>
                      <td className="text-center">
                        {sem?.Year} - {sem?.Session}
                      </td>
                      <td className="text-center">{sub?.Name}</td>
                      <td className="text-center">{cournow?.name}</td>
                      <td className="text-center">
                        <Link
                          to={`/projectdetails/${cournow.id}/${project?.Id}`}
                          className={cx("link-style")}
                        >
                          <FontAwesomeIcon icon={faCircleInfo} />{" "}
                          {project?.Name}
                        </Link>
                      </td>
                      {/* <td>{project.Notion}</td> */}
                      <td className="text-center">
                        <Button edit onClick={() => handleEdit(project.Id)}>
                          <FontAwesomeIcon icon={faPenToSquare} /> Edit
                        </Button>
                        <button
                          className={cx("btn-dl")}
                          onClick={() => handleClickDelete(project.Id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} /> Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={cx("form-modal")} onSubmit={formik.handleSubmit}>
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

      {/* Modal Confirm */}
      <Modal
        show={showConfirm}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Delete a project</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this Project ID
            = {idDelete} ?
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Btn
            variant="primary"
            className={cx("btn-bt")}
            onClick={handleDelete}
          >
            Confirm
          </Btn>
          <Btn
            variant="secondary"
            className={cx("btn-bt")}
            onClick={handleClose}
          >
            Cancel
          </Btn>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListProjectAdmin;
