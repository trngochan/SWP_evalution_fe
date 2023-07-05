import { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import styles from "./boardscore.module.scss";
import axios from "axios";
import classNames from "classnames/bind";
import { Snackbar, Alert, TextField, Typography } from "@mui/material";

import Infor from "~/components/infor";
import Header from "~/components/layouts/header";
import Button from "~/components/button";
import Footer from "~/components/layouts/footer";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function TeacherBoardScore() {
  const [studentScores, setStudentScores] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies();
  const [studentList, setStudentList] = useState([]);
  const [ScoreList, setScoreList] = useState([]);
  const [ScoreStudents, setScoreStudents] = useState([]);
  const [error, setError] = useState("");
  const { marked } = useParams();

  const listStd = () => {
    return axios.get(`/student/${cookies.project_id}/project`, {
      withCredentials: true,
    });
  };
  const listScore = () => {
    return axios.get(`/scorecolumn/${cookies.template_id}`, {
      withCredentials: true,
    });
  };

  useEffect(() => {
    const fetchData = () => {
      Promise.all([listStd(), listScore()])
        .then(([response1, response2]) => {
          // Xử lý kết quả của cả hai API
          setStudentList(response1.data);
          setScoreList(response2.data);
          response1.data.map((std) => {
            setScoreStudents((prev) => [
              ...prev,
              { stdinprjId: std.stdinprjId },
            ]);
          });
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    };
    fetchData();
  }, []);

  const [projectSPublics, setProjectSPublics] = useState([]);
  const [inforProject, setInforProject] = useState({});

  useEffect(() => {
    async function fetchData() {
      const req2 = await axios.get(`/project/${cookies.project_id}/getbyid`);
      const req5 = await axios.get(`/project/getallpubliced`);

      return axios.all([req2, req5]).then(
        axios.spread((response1, respone4) => {
          // Xử lý response từ request1 và requests
          setInforProject(response1.data?.[0]);
          setProjectSPublics(respone4.data.data);
        })
      );
    }
    fetchData();
  }, []);

  console.log(inforProject);

  useEffect(() => {
    async function fetchData() {
      for (let i = 0; i < studentList.length; i++) {
        const student = studentList[i];
        const response = await axios.get(
          `/score/${cookies.lectureinboard_id}/${student.StudentId}/${cookies.project_id}`
        );
        if (response.data.status === 200) {
          const score = response.data.data;
          setStudentScores((prevStudentScores) => ({
            ...prevStudentScores,
            [student.StudentId]: score,
          }));
        }
      }
    }

    fetchData();
  }, [studentList]);

  function validateValues(arr) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];

      // Kiểm tra các giá trị của khóa `name` trong đối tượng
      for (const key in obj) {
        if (key !== "stdinprjId" && !isNaN(obj[key])) {
          const value = parseInt(obj[key]);

          // Kiểm tra giá trị số nằm trong khoảng từ 0 đến 10
          if (value <= 0 || value >= 10) {
            return false; // Trả về false nếu giá trị không hợp lệ
          }
        }
      }
    }

    return true; // Trả về true nếu tất cả các giá trị hợp lệ
  }

  const handleSubmit = (e) => {
    if (studentList.length > 0) {
      if (validateValues(ScoreStudents)) {
        setError("");
        for (let i = 0; i < ScoreStudents.length; i++) {
          e.preventDefault();

          axios
            .post("/score/insert", {
              score: ScoreStudents[i],
              lectureinboardId: cookies.lectureinboard_id,
              courseID: cookies.course_id,
            })
            .then((res) => res.data)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => console.log(err));
        }
        window.history.back();
      } else {
        setError("Scores must be number, greater than 0 and less than 10");
      }
    } else {
      setOpenSnackBarError(true);
    }
  };

  async function handleUpdate() {
    try {
      if (
        !projectSPublics.some(
          (projectSPublic) => projectSPublic.ProjectId == inforProject.Id
        )
      ) {
        const valuesStudentScores = Object.values(studentScores);
        await Promise.all(
          valuesStudentScores.map(async (valueStudentScores) => {
            await Promise.all(
              valueStudentScores.map(async (studentScore) => {
                const data = {
                  stdInPro: studentScore.Id,
                  scoreColumnId: studentScore.ScoreColumnId,
                  score: studentScore.Score,
                  lecInBoard: parseInt(cookies.lectureinboard_id),
                  course: parseInt(cookies.course_id),
                };
                const response = await axios.put("/score/update", data);
                if (response.data.status != 200) {
                  console.log("Error updating");
                }
              })
            );
          })
        );
        setOpenSnackBarSuccess(true);
      } else {
        setOpenSnackBarError(true);
      }
    } catch (error) {
      console.log("Error at handleUpdate");
    }
  }

  const [openSnackBarSuccess, setOpenSnackBarSuccess] = useState(false);
  function closeSnackbarSuccess() {
    setOpenSnackBarSuccess(false);
  }

  const [openSnackBarError, setOpenSnackBarError] = useState(false);
  function closeSnackbarError() {
    setOpenSnackBarError(false);
  }

  return (
    <div>
      <Header />
      <Infor />
      <div>
        <div className="row">
          <h2 className={cx("title")}>Information details of project</h2>
          <div className="col-6">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">CourseID</th>
                  <td>{inforProject?.CourseId}</td>
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
        <div className={cx("wrapper")}>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                {ScoreList.map((column, i) => {
                  return (
                    <th key={i}>
                      {column.name} ({column.percent})
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {studentList.length > 0 ? (
                studentList?.map((student, i) => {
                  const studentScore = studentScores[student.StudentId] || [];
                  return (
                    <tr key={i}>
                      <th>
                        {student.CODE} - {student.Name}
                      </th>
                      {ScoreList.map((column, i) => {
                        const scores = studentScore?.find((score) => {
                          return score.ScoreColumnId == column.id;
                        });

                        return (
                          <td key={i}>
                            <input
                              min={0}
                              max={10}
                              type="number"
                              onChange={(e) => {
                                if (marked === "marked") {
                                  const updateScore = studentScore.map(
                                    (score) => {
                                      if (score.ScoreColumnId == column.id) {
                                        score.Score =
                                          parseInt(e.target.value) || "";
                                      }
                                      return score;
                                    }
                                  );
                                  setStudentScores((prev) => {
                                    return {
                                      ...prev,
                                      [student.StudentId]: updateScore,
                                    };
                                  });
                                } else {
                                  setScoreStudents((prev) => {
                                    let index = prev.findIndex(
                                      (obj) =>
                                        obj.stdinprjId === student.stdinprjId
                                    );
                                    prev[index][column.id] = e.target.value;
                                    return [...prev];
                                  });
                                }
                              }}
                              value={scores?.Score}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <Typography mt={1} variant="h5" align="center">
                  No has student in project
                </Typography>
              )}
            </tbody>
          </table>
          {error && (
            <span
              style={{
                color: "red",
              }}
            >
              {error}
            </span>
          )}
          <div className={cx("btn-submit")}>
            {marked === "marked" ? (
              <Button primary onClick={handleUpdate}>
                Update
              </Button>
            ) : (
              <Button primary onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {/* Snackbar */}
      <Snackbar
        open={openSnackBarSuccess}
        autoHideDuration={3000}
        onClose={closeSnackbarSuccess}
      >
        <Alert severity="success">Update grade successfully</Alert>
      </Snackbar>

      <Snackbar
        open={openSnackBarError}
        autoHideDuration={3000}
        onClose={closeSnackbarError}
      >
        <Alert severity="error">This operation cannot be performed</Alert>
      </Snackbar>
    </div>
  );
}

export default TeacherBoardScore;
