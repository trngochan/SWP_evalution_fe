import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./details.module.scss";
import Table from "react-bootstrap/Table";
import classNames from "classnames/bind";
import { Snackbar, Alert } from "@mui/material";

import Button from "~/components/button";
import { Header2 } from "~/components/layouts/header";
import BoardDetail from "./boarddetails";

const cx = classNames.bind(styles);

function ProjectDetails() {
  const [students, setStudents] = useState([]);
  const [studentNoInPro, setStudentNoInPro] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [inforProject, setInforProject] = useState({});
  const [showTableListStudents, setShowTableListStudents] = useState(true);
  const [showTableListStudentNoInCourse, setShowTableListStudentNotInCourse] =
    useState(false);
  const [isStudentsButtonPrimary, setIsStudentsButtonPrimary] = useState(true);
  const [
    isStudentsNoInCourseButtonPrimary,
    setIsStudentsNoInCourseButtonPrimary,
  ] = useState(false);

  const [error, setError] = useState("");

  const { project } = useParams();
  const { course } = useParams();

  const [numTeacher, setNumTeacher] = useState(0);
  const [numTeacherMarked, setNumTeacherMarked] = useState(0);
  const [projectSPublics, setProjectSPublics] = useState([]);
  const [boardDetails, setBoardDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/student/${project}/project`);
      const req2 = await axios.get(`/project/${project}/getbyid`);
      const req3 = await axios.get(`/teacher/${project}/quaninboard`);
      const req4 = await axios.get(`/teacher/${project}/quanmarked`);
      const req5 = await axios.get(`/project/getallpubliced`);
      const req6 = await axios.get(`/evalution/${project}/getbyproject`);

      return axios.all([req1, req2, req3, req4, req5, req6]).then(
        axios.spread(
          (response, response1, response2, respone3, respone4, respone5) => {
            // Xử lý response từ request1 và requests
            setStudents(response.data);
            setInforProject(response1.data?.[0]);
            setNumTeacher(response2.data[0].totalTeacher);
            setNumTeacherMarked(respone3.data[0].totalTeachersMark);
            setProjectSPublics(respone4.data.data);
            setBoardDetails(respone5.data.data[0]);
          }
        )
      );
    }
    fetchData();
  }, [rerender]);

  async function handleShowStdNoHasProject() {
    const response = await axios.get(`/student/${course}/getstdnotinproject`);
    setStudentNoInPro(response.data.data);
  }

  async function handleAddIntoProject(id) {
    const response = await axios.post(`/studentinproject/add`, {
      student: id,
      project,
    });
    console.log(response);

    if (response.status === 200) {
      setRerender(!rerender);
      handleShowStdNoHasProject();
    }
  }

  async function handRemoveStd(id) {
    const response = await axios.delete(`/studentinproject/${id}/remove`);

    if (response.status === 200) {
      setRerender(!rerender);
      handleShowStdNoHasProject();
    }
  }

  const handleShowTableStudents = () => {
    setError("");
    setShowTableListStudents(true);
    setShowTableListStudentNotInCourse(false);
    setIsStudentsNoInCourseButtonPrimary(false);
    setIsStudentsButtonPrimary(true);
  };

  const handleShowTableStudentsNoInCourse = () => {
    setError("");
    setShowTableListStudentNotInCourse(true);
    setShowTableListStudents(false);
    setIsStudentsButtonPrimary(false);
    handleShowStdNoHasProject();
    setIsStudentsNoInCourseButtonPrimary(true);
  };

  const [openSnackBar, setOpenSnackBar] = useState(false);
  function closeSnackbar() {
    setOpenSnackBar(false);
  }

  console.log(boardDetails);

  return (
    <>
      <Header2 />
      <div className={cx("table-1")}>
        <h2 className={cx("title")}>Information details of project</h2>
        <div className="col-6">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th scope="row">EvaluationBoard ID</th>
                <td>
                  {boardDetails
                    ? `${boardDetails?.Id} - ${boardDetails?.Name}`
                    : "No infor"}
                </td>
              </tr>
              <tr>
                <th scope="row">CourseID</th>
                <td>{inforProject.CourseId}</td>
              </tr>
              <tr>
                <th>Project ID</th>
                <td>{inforProject.Id}</td>
              </tr>
              <tr>
                <th>Topic</th>
                <td>{inforProject.Name}</td>
              </tr>
              <tr>
                <th>Notion</th>
                <td>{inforProject.Notion}</td>
              </tr>
              <tr>
                <th>Overview</th>
                <td>
                  {numTeacherMarked}/{numTeacher}
                </td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  {projectSPublics.some(
                    (projectSPublic) =>
                      projectSPublic.ProjectId == inforProject.Id
                  )
                    ? "Publiced"
                    : "No puclic"}
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
            onClick={handleShowTableStudents}
            small={isStudentsButtonPrimary}
          >
            List students
          </Button>
          <Button
            className={cx("mb-5 mt-5 show")}
            onClick={handleShowTableStudentsNoInCourse}
            small={isStudentsNoInCourseButtonPrimary}
          >
            Add student
          </Button>
        </div>

        {showTableListStudents && (
          <section>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student CODE</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Remove</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, i) => (
                  <tr key={i}>
                    <td>{student.CODE}</td>
                    <td>{student.Name}</td>
                    <td>{student.Address}</td>
                    <td>
                      <Button
                        onClick={() => {
                          if (numTeacherMarked > 0) {
                            setError("Can not remove because project is graded");
                            setOpenSnackBar(true);
                          } else {
                            handRemoveStd(student.stdinprjId);
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                    <td
                      style={{
                        display: "flex",
                      }}
                    >
                      <Button>Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>
        )}

        {showTableListStudentNoInCourse && (
          <section>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student CODE</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentNoInPro.map((student, i) => (
                  <tr key={i}>
                    <td>{student.Code}</td>
                    <td>{student.Name}</td>
                    <td>{student.Address}</td>
                    <td>
                      <Button
                        onClick={() => {
                          if (numTeacherMarked > 0) {
                            setError("Can not add becasue project is graded");
                            setOpenSnackBar(true);
                          } else {
                            handleAddIntoProject(student.StudentId);
                          }
                        }}
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>
        )}
        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={closeSnackbar}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default ProjectDetails;
