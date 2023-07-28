import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
// import { Modal, Button as Btn } from "react-bootstrap";

import { Header2 } from "~/components/layouts/header";
import styles from "./details.module.scss";
import Button from "~/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button as Btn } from "react-bootstrap";
import backendURL from "~/URL_BACKEND/urlbackend";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function SubjectDetails() {
  const { subject } = useParams();
  const [courses, setCourses] = useState([]);
  const [inforSubject, setInforSubject] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [semesterList, setsemesterList] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [idDelete, setIdDelete] = useState(0);
  const [rerender, setRerender] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);


  const handleClose = () => {
    setShowModalAdd(false);
    setShowModalAdd(false);
  };

  const handleAdd = () => {
    setShowModalAdd(true);
  };

  const handleClickDelete = async (id) => {
    setShowConfirm(true);
    setIdDelete(id);
  };

  async function handleDelete() {
    const response = await axios.delete(`${backendURL}/course/${idDelete}`);

    if (response.data.status === 200) {
      setRerender(!rerender);
      toast.success("Deleted course successfully");
      handleClose();
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${backendURL}/subject/${subject}/getbyid`
      );
      const response1 = await axios.get(
        `${backendURL}/course/${subject}/getbysubject`
      );
      const req2 = await axios.get(`${backendURL}/semester/getall`, {});
      const req4 = await axios.get(`${backendURL}/teacher/getall`);
      setTeachers(req4.data);
      setCourses(response1.data);
      setInforSubject(response.data?.[0]);
      setsemesterList(req2.data);
    }
    fetchData();
  }, [rerender]);

  console.log(teachers);
  return (
    <>
      <Header2 />
      <div className={cx("table-1")}>
        <h2 className={cx("title")}>Information details of subject</h2>
        <div className="col-6">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Subject ID</th>
                <td>{inforSubject.Id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{inforSubject.Name}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{inforSubject.Description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={cx("table-2")}>
        <div className="row">
          <th
            className={cx("head-title")}
            style={{
              fontSize: "20px",
            }}
          >
            List course in subject
            {/* <div className={cx("btn-view-add")}> */}
          <Button active onClick={() => handleAdd()}>
            + Add
          </Button>
        {/* </div> */}
          </th>
          
          <Table bordered hover>
            <thead className="text-center">
              <tr>
                <th>Semester ID</th>
                <th>Course ID</th>
                <th>Name</th>
                <th>Teacher</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, i) => {
                const semnow = semesterList.find(
                  (sem) => sem.Id === course.SemesterId
                );
                const teachernow = teachers.find(
                  (teacher) => teacher.id === course.LectureId
                );
                return (
                  <tr key={i}>
                    <td className="text-center">
                      {semnow?.Year} - {semnow?.Session}
                    </td>
                    <td className="text-center">{course.Id}</td>
                    <td className="text-center">{course.Name}</td>
                    <td className="text-center">{teachernow?.name}</td>
                    <td className="text-center">
                      <Button to={`/coursedetails/${course.Id}`}>
                        Details
                      </Button>
                      <button
                        className={cx("btn-dl")}
                        onClick={() => handleClickDelete(course.Id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} /> Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal Confirm */}
      <Modal
        show={showConfirm}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Delete a subject.</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this subject ID
            = {idDelete}?
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

      <Modal show={showModalAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form >
          <label className={cx("form-label", "mb-2")}>Semester:</label>
          <select
            className={cx("form-select")}
            name="semesterId"
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
            // value={formik.values.semesterId}
          >
            <option value="">Select Semester</option>
            {/* {semesters.map((semester, i) => (
              <option key={i} value={semester.Id}>
                {semester.Year} {semester.Session}
              </option>
            ))} */}
          </select>
          {/* {formik.errors.semesterId && formik.touched.semesterId && (
            <span className={cx("form-message")}>
              {formik.errors.semesterId}
            </span>
          )} */}

        <label className={cx("form-label", "mb-2")}>Lecture:</label>
          <select
            className={cx("form-select")}
            name="semesterId"
            // onBlur={formik.handleBlur}
            // onChange={formik.handleChange}
            // value={formik.values.semesterId}
          >
            <option value="">Select Lecture</option>
            {/* {semesters.map((semester, i) => (
              <option key={i} value={semester.Id}>
                {semester.Year} {semester.Session}
              </option>
            ))} */}
          </select>
          {/* {formik.errors.semesterId && formik.touched.semesterId && (
            <span className={cx("form-message")}>
              {formik.errors.semesterId}
            </span>
          )} */}

          <label>Name:</label>
            <input
              className={"form-control"}
              placeholder="Enter name"
              type="text"
              // name="birthday"
              // value={formik.values.birthday}
              // onChange={formik.handleChange}
            />
            {/* {formik.errors.birthday && formik.touched.birthday && (
              <span className={"form-message"}>{formik.errors.birthday}</span>
            )} */}    
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Btn
            variant="secondary"
            onClick={handleClose}
            className={cx("btn-bt")}
          >
            Close
          </Btn>
          <Btn
            type="submit"
            variant="primary"
            // onClick={formik.handleSubmit}
            className={cx("btn-bt")}
          >
            Add
          </Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SubjectDetails;
