import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import React from "react";
import Table from "react-bootstrap/Table";
import { Modal, Button as Btn } from "react-bootstrap";

import { Header2 } from "~/components/layouts/header";
import Button from "~/components/button";
import styles from "./details.module.scss";
import classNames from "classnames/bind";
import backendURL from "~/URL_BACKEND/urlbackend";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function CourseDetails() {
  const [project, setProject] = useState([]);
  const [student, setStudent] = useState([]);
  const [studentNotCour, setStudentNotCour] = useState([]);
  const [inforCourse, setInforCourse] = useState({});
  const [showTableListProjects, setShowTableListProjects] = useState(true);
  const [showTableListStudents, setShowTableListStudents] = useState(false);
  const [
    showTableListStudentsNotInCourse,
    setShowTableListStudentsNotInCourse,
  ] = useState(false);
  const [isProjectsButtonPrimary, setIsProjectsButtonPrimary] = useState(true);
  const [isStudentsButtonPrimary, setIsStudentsButtonPrimary] = useState(false);
  const [
    isStudentsNotInCourseButtonPrimary,
    setIsStudentsNotInCourseButtonPrimary,
  ] = useState(false);

  const [inforSem, setInforSem] = useState({});
  const [inforSub, setInforSub] = useState({});
  const [inforTeach, setInforTeach] = useState({});
  const [showModalAdd, setShowModalAdd] = useState(false);

  const handleShowTableProjects = () => {
    setShowTableListProjects(true);
    setShowTableListStudents(false);
    setShowTableListStudentsNotInCourse(false);
    setIsProjectsButtonPrimary(true);
    setIsStudentsButtonPrimary(false);
    setIsStudentsNotInCourseButtonPrimary(false);
  };

  const handleShowTableStudents = () => {
    setShowTableListStudents(true);
    setShowTableListProjects(false);
    setShowTableListStudentsNotInCourse(false);
    setIsStudentsButtonPrimary(true);
    setIsProjectsButtonPrimary(false);
    setIsStudentsNotInCourseButtonPrimary(false);
  };

  const handleShowTableStudentsNotInCourse = () => {
    setShowTableListStudentsNotInCourse(true);
    setShowTableListProjects(false);
    setShowTableListStudents(false);
    setIsStudentsNotInCourseButtonPrimary(true);
    setIsProjectsButtonPrimary(false);
    setIsStudentsButtonPrimary(false);
  };

  const { course } = useParams();

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(
        `${backendURL}/student/${course}/course`,
        {}
      );
      const req2 = await axios.get(
        `${backendURL}/project/${course}/projectincourses`,
        {}
      );
      const req3 = await axios.get(`${backendURL}/course/${course}/getbyid`);

      return axios.all([req1, req2, req3]).then(
        axios.spread((listStd, listPrj, inforCourse) => {
          // Xử lý response từ request1 và requests
          setProject(listPrj.data);
          setStudent(listStd.data);
          setInforCourse(inforCourse.data?.[0]);
        })
      );
    }

    fetchData();
  }, [rerender]);

  useEffect(() => {
    async function getDataSemester() {
      if (Object.keys(inforCourse).length > 0) {
        const response = await axios.get(
          `${backendURL}/semester/${inforCourse.SemesterId}`
        );
        const req2 = await axios.get(
          `${backendURL}/subject/${inforCourse.SubjectId}/getbyid`
        );
        const req3 = await axios.get(
          `${backendURL}/teacher/${inforCourse.LectureId}`
        );
        setInforSem(response.data.data?.[0]);
        setInforSub(req2.data?.[0]);
        setInforTeach(req3.data.data?.[0]);
      }
    }

    getDataSemester();
  }, [inforCourse]);

  async function handleShowStudentNotInCourse() {
    const response = await axios.get(
      `${backendURL}/student/${course}/getstdnotincour`
    );

    setStudentNotCour(response.data.data);
  }

  async function handleAddStdInCour(student) {
    const response = await axios.post(`${backendURL}/studentincourse/add`, {
      course,
      student,
    });
    handleShowStudentNotInCourse();
    setRerender(!rerender);
  }

  const handleClose = () => {
    setShowModalAdd(false);
  };

  const handleAdd = () => {
    setShowModalAdd(true);
  };

  const [projectNameAdd, setProjectNameAdd] = useState("");
  const [noteAdd, setNoteAdd] = useState("");

  function handleAddProject() {
    if (projectNameAdd != "" && noteAdd != "") {
      axios
        .post(`${backendURL}/project/add`, {
          name: projectNameAdd,
          notion: noteAdd,
          courseId: inforCourse?.Id,
        })
        .then((res) => res.data)
        .then((data) => {
          if (data.status === 200) {
            setRerender((prev) => !prev);
            handleClose();
            toast.success("Add project successfully");
            setNoteAdd("");
            setProjectNameAdd("");
          } else {
          }
        });
    }
  }

  return (
    <>
      <Header2 />
      <div className={cx("table-1")}>
        <h2 className={cx("title")}>Information details of course</h2>
        <div className="col-6">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Semester </th>
                <td>
                  {inforSem?.Year}_{inforSem?.Session}
                </td>
              </tr>
              <tr>
                <th scope="row">Subject</th>
                <td>
                  <Link
                    to={`/subjectdetails/${inforSub?.Id}`}
                    className={cx("link-style")}
                  >
                    {inforSub?.Id}_{inforSub?.Name}
                  </Link>
                </td>
              </tr>
              <tr>
                <th>Course </th>
                <td>
                  {inforCourse?.Id}_{inforCourse?.Name}
                </td>
              </tr>

              <tr>
                <th>Lecturer</th>
                <td>
                  {inforCourse.LectureId} - {inforTeach.Name}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={cx("table-2")}>
        <div className={cx("title-table")}>
          <Button
            className={cx("mb-5 mt-5 show")}
            onClick={handleShowTableProjects}
            small={isProjectsButtonPrimary}
          >
            List projects
          </Button>
          <Button
            className={cx("mb-5 mt-5 show")}
            onClick={handleShowTableStudents}
            small={isStudentsButtonPrimary}
          >
            List students
          </Button>
          <Button
            className={cx("mb-5 mt-5 show")}
            onClick={() => {
              handleShowTableStudentsNotInCourse();
              handleShowStudentNotInCourse();
            }}
            small={isStudentsNotInCourseButtonPrimary}
          >
            Add student
          </Button>
          <Button className={cx("mb-5 mt-5 show")} onClick={() => handleAdd()}>
            Add project
          </Button>
        </div>

        <div className="table-list">
          {showTableListProjects && (
            <section>
              <Table bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {project.length > 0 ? (
                    project.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">{item.prjId}</td>
                          <td className="text-center">
                            <Link
                              to={`/projectdetails/${inforCourse?.Id}/${item.prjId}`}
                              className={cx("link-style")}
                            >
                              {item.Name}
                            </Link>
                          </td>
                          <td>{item.notion}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <p>No item</p>
                  )}
                </tbody>
              </Table>
            </section>
          )}

          {showTableListStudents && (
            <section>
              <Table bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Birth day</th>
                    <th>Adress</th>
                  </tr>
                </thead>
                <tbody>
                  {student.length > 0 ? (
                    student.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">{item.code}</td>
                          <td className="text-center">{item.name}</td>
                          <td className="text-center">
                            {item.birthday
                              ? JSON.stringify(item.birthday).slice(1, 11)
                              : "No infor"}
                          </td>
                          <td className="text-center">
                            {item.address ? item.address : "No infor"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <p>No item</p>
                  )}
                </tbody>
              </Table>
            </section>
          )}

          {showTableListStudentsNotInCourse && (
            <section>
              <Table bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Birth day</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentNotCour.length > 0 ? (
                    studentNotCour.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">{item.Code}</td>
                          <td className="text-center">{item.Name}</td>
                          <td className="text-center">
                            {item.BirthDay
                              ? JSON.stringify(item.BirthDay).slice(1, 11)
                              : "No infor"}
                          </td>
                          <td className="text-center">
                            <Button
                              active
                              onClick={() => handleAddStdInCour(item.Id)}
                            >
                              + Add
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <p>No item</p>
                  )}
                </tbody>
              </Table>
            </section>
          )}
        </div>
      </div>

      <Modal show={showModalAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label htmlFor="name">Project Name:</label>
            <input
              className={"form-control"}
              placeholder="Enter name for project"
              // type="text"
              // name="name"
              // value={formik.values.name}
              onChange={(e) => setProjectNameAdd(e.target.value)}
            />
            {/* {formik.errors.name && formik.touched.name && (
              <span className={"form-message"}>{formik.errors.name}</span>
            )} */}
            <br />

            <label>Note:</label>
            <input
              className={"form-control"}
              placeholder="Enter note"
              onChange={(e) => setNoteAdd(e.target.value)}
              // type="date"
              // name="birthday"
              // value={formik.values.birthday}
              // onChange={formik.handleChange}
            />
            {/* {formik.errors.birthday && formik.touched.birthday && (
              <span className={"form-message"}>{formik.errors.birthday}</span>
            )} */}
            <br />
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
            onClick={handleAddProject}
            className={cx("btn-bt")}
          >
            Add
          </Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CourseDetails;
