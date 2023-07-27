import { useState, useEffect } from "react";
import Button from "~/components/button";
import axios from "axios";
import { useCookies } from "react-cookie";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import BoardHeader from "~/components/headeritem";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import AddCourse from "../create/AddCourse";
import styles from "./admin.module.scss";
import { Modal, Button as Btn } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function ListCourseAdmin() {
  const [, setCookie] = useCookies();
  const [isShowAdd, setShowAdd] = useState(false);
  const [courses, setCourse] = useState([]);
  const [semesterList, setsemesterList] = useState([]);
  const [semId, setSemId] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rerender, setRerender] = useState(true);
  const [idDelete, setIdDelete] = useState(0);

  const handleClose = () => {
    setShowConfirm(false);
  };

  const handleClickDelete = (id) => {
    setIdDelete(id);
    setShowConfirm(true);
  };

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`${backendURL}/course/getall`);
      const req2 = await axios.get(`${backendURL}/semester/getall`, {});
      const req3 = await axios.get(`${backendURL}/subject/getall`);
      const req4 = await axios.get(`${backendURL}/teacher/getall`);

      return axios.all([req1, req2, req3, req4]).then(
        axios.spread((listCourse, listSemester, listSubject, listTeacher) => {
          // Xử lý response từ request1 và requests
          setCourse(listCourse.data);
          setsemesterList(listSemester.data);
          setSubjects(listSubject.data);
          setTeachers(listTeacher.data);
        })
      );
    }

    fetchData();
  }, [isShowAdd, rerender]);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  function handleShowProjects(id) {
    setCookie("course_id", id);
  }

  async function handleDelete() {
    const req3 = await axios.delete(`${backendURL}/course/${idDelete}`);
    if (req3.data.status === 200) {
      setRerender(!rerender);
      setShowConfirm(false);
      toast.success("Delele successfully");
    }
  }

  return (
    <div className={cx("container")}>
      <div className={cx("container-header")}>
        <BoardHeader message={"Courses"} />

        <div className={cx("btns")}>
          <Button active onClick={() => setShowAdd(!isShowAdd)}>
            {isShowAdd ? "View" : "+Add"}
          </Button>
        </div>
      </div>
      {isShowAdd ? (
        <AddCourse setShowAdd={setShowAdd} />
      ) : (
        <>
          <div className="col-2">
            <select
              className={cx("form-select")}
              aria-label="Default select example"
              defaultValue={""}
              onClick={(e) => {
                handleChooseSem(e.target.value);
              }}
            >
              <option className="text-center" value="0">
                All semester
              </option>
              {semesterList.map((semester, i) => {
                return (
                  <option value={semester.Id} key={i}>
                    {semester?.Year}-{semester?.Session}
                  </option>
                );
              })}
            </select>
          </div>

          <Table bordered hover className="text-center">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Semester</th>
                <th>Subject</th>
                <th>Name</th>
                <th>Teacher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses
                ?.filter(function (item) {
                  if (parseInt(semId) === 0) return true;
                  else return parseInt(item.SemesterId) === parseInt(semId);
                })
                .map((course, i) => (
                  <tr key={i}>
                    <td className="text-center">{course.Id}</td>
                    <td className="text-center">
                      {
                        semesterList.find(
                          (semester) => semester.Id === course.SemesterId
                        )?.Year
                      }{" "}
                      -{" "}
                      {
                        semesterList.find(
                          (semester) => semester.Id === course.SemesterId
                        )?.Session
                      }
                    </td>
                    <td className="text-center">
                      {
                        subjects.find(
                          (subject) => subject.Id === course.SubjectId
                        )?.Name
                      }
                    </td>
                    <td
                      className="text-center"
                      onClick={() => {
                        handleShowProjects(course.Id);
                      }}
                    >
                      <Link
                        to={`/coursedetails/${course.Id}`}
                        className={cx("link-style")}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} /> {course.Name}
                      </Link>
                    </td>
                    <td className="text-center">
                      {
                        teachers.find(
                          (teacher) => teacher.id === course.LectureId
                        )?.name
                      }
                    </td>
                    <td className="text-center">
                      <button
                        className={cx("btn-dl")}
                        onClick={() => handleClickDelete(course.id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Modal Confirm */}
      <Modal
        show={showConfirm}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Delete a course</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this Course ID ={" "}
            {idDelete} ?
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

export default ListCourseAdmin;
