import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import Table from "react-bootstrap/Table";
import { useCookies } from "react-cookie";

import { Header2 } from "~/components/layouts/header";
import Button from "~/components/button";
import styles from "./details.module.scss";
import classNames from "classnames/bind";
import Divider from "~/components/Divider";

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
      const req1 = await axios.get(`/student/${course}/course`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/project/${course}/projectincourses`, {
        withCredentials: true,
      });
      const req3 = await axios.get(`/course/${course}/getbyid`);

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
        const response = await axios.get(`/semester/${inforCourse.SemesterId}`);
        const req2 = await axios.get(
          `/subject/${inforCourse.SubjectId}/getbyid`
        );
        const req3 = await axios.get(`/teacher/${inforCourse.LectureId}`);
        setInforSem(response.data.data?.[0]);
        setInforSub(req2.data?.[0]);
        setInforTeach(req3.data.data?.[0]);
      }
    }

    getDataSemester();
  }, [inforCourse]);

  console.log(inforTeach);

  async function handleShowStudentNotInCourse() {
    const response = await axios.get(`/student/${course}/getstdnotincour`);

    setStudentNotCour(response.data.data);
  }

  async function handleAddStdInCour(student) {
    const response = await axios.post(`/studentincourse/add`, {
      course,
      student,
    });
    handleShowStudentNotInCourse();
    setRerender(!rerender);
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
                <th scope="row">Semester ID</th>
                <td>
                  {inforSem.Year}_{inforSem.Session}
                </td>
                <td>
                  <button
                    style={{
                      background: "transparent",
                    }}
                  ></button>
                </td>
              </tr>
              <tr>
                <th scope="row">Subject</th>
                <td>
                  {inforCourse.SubjectId}_{inforSub.Name}
                </td>
                <td>
                  <button
                    style={{
                      background: "transparent",
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
              <tr>
                <th>Course </th>
                <td>
                  {inforCourse.id}_{inforCourse.name}
                </td>
                <td>
                  <button
                    style={{
                      background: "transparent",
                    }}
                  ></button>
                </td>
              </tr>

              <tr>
                <th>Lecturer</th>
                <td>
                  {inforCourse.LectureId} - {inforTeach.Name}
                </td>
                <td>
                  <button
                    style={{
                      background: "transparent",
                    }}
                  >
                    Details
                  </button>
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
            primary={isProjectsButtonPrimary}
          >
            List projects
          </Button>
          <Button
            className={cx("mb-5 mt-5 show")}
            onClick={handleShowTableStudents}
            primary={isStudentsButtonPrimary}
          >
            List students
          </Button>
          <Button
            className={cx("mb-5 mt-5 show")}
            onClick={() => {
              handleShowTableStudentsNotInCourse();
              handleShowStudentNotInCourse();
            }}
            primary={isStudentsNotInCourseButtonPrimary}
          >
            Add student
          </Button>
        </div>

        <div className="table-list">
          {showTableListProjects && (
            <section>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Name</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {project.length > 0 ? (
                    project.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.prjId}</td>
                          <td>{item.Name}</td>
                          <td>{item.notion}</td>
                          <td>
                            <Button
                              to={`/projectdetails/${course}/${item.prjId}`}
                            >
                              Details
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

          {showTableListStudents && (
            <section>
              {/* <table>
              <thead>
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
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>
                          {item.birthday
                            ? JSON.stringify(item.birthday).slice(1, 11)
                            : "No infor"}
                        </td>
                        <td>{item.adress ? item.adress : "No infor"}</td>
                      </tr>
                    );
                  })
                ) : (
                  <p>No item</p>
                )}
              </tbody>
            </table> */}
              <Table striped bordered hover>
                <thead>
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
                          <td>{item.code}</td>
                          <td>{item.name}</td>
                          <td>
                            {item.birthday
                              ? JSON.stringify(item.birthday).slice(1, 11)
                              : "No infor"}
                          </td>
                          <td>{item.adress ? item.adress : "No infor"}</td>
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
              {/* <table>
              <thead>
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
                        <td>{item.Code}</td>
                        <td>{item.Name}</td>
                        <td>
                          {item.BirthDay
                            ? JSON.stringify(item.BirthDay).slice(1, 11)
                            : "No infor"}
                        </td>
                        <td>
                          <Button onClick={() => handleAddStdInCour(item.Id)}>
                            Add
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p>No item</p>
                )}
              </tbody>
            </table> */}
              <Table striped bordered hover>
                <thead>
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
                          <td>{item.Code}</td>
                          <td>{item.Name}</td>
                          <td>
                            {item.BirthDay
                              ? JSON.stringify(item.BirthDay).slice(1, 11)
                              : "No infor"}
                          </td>
                          <td>
                            <Button onClick={() => handleAddStdInCour(item.Id)}>
                              Add
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
    </>
  );
}

export default CourseDetails;
