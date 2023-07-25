import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Header2 } from "~/components/layouts/header";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Footer from "~/components/layouts/footer";
import toad from "~/components/img/toad.png";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function InforStudent() {
  const [cookies] = useCookies();
  if (!cookies.user) {
    // window.location.href = "/";
  }

  const [listCourse, setListCourse] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [scores, setScores] = useState();
  const [semId, setSemId] = useState(0);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("No infor");
  const [course, setCourse] = useState("No infor");

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(
        `${backendURL}/course/${cookies.user.id}/student`,
        {
          withCredentials: true,
        }
      );
      const req2 = await axios.get(`${backendURL}/semester/getall`, {
        withCredentials: true,
      });

      return axios.all([req1, req2]).then(
        axios.spread((listCourse, listSemester) => {
          // Xử lý response từ request1 và requests
          setListCourse(listCourse.data);
          setSemesters(listSemester.data);
        })
      );
    }

    fetchData();
  }, []);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  async function showScore(courseId) {
    const response = await axios.post(
      `${backendURL}/score/get`,
      {
        id: cookies.user.id,
        courseId: courseId,
      },
      {
        withCredentials: true,
      }
    );

    if (response.data.status === 201) {
      setMessage("");
      setScores(response.data.data.score);
      setStatus(response.data.data.status);
    } else {
      if (response.data.status === 204) {
        setScores(0.0);
        setMessage(response.data.message);
      }
    }
  }

  return (
    <div>
      <Header2 />
      <div className={cx("container-student")}>
        <div className="row mt-4">
          <div className="col-3">
            <div className={cx("container-select")}>
              <select
                className={cx("form-select")}
                aria-label="Default select example"
                defaultValue={""}
                onClick={(e) => {
                  handleChooseSem(e.target.value);
                }}
              >
                <option value="0">All semester</option>
                {semesters.map((semester, i) => {
                  return (
                    <option key={i} value={semester.Id}>
                      {semester.Year} - {semester.Session}{" "}
                    </option>
                  );
                })}
              </select>
              {listCourse
                .filter(function (item) {
                  if (parseInt(semId) === 0) return true;
                  else return parseInt(item.SemesterId) === parseInt(semId);
                })
                .map((course, i) => {
                  return (
                    <li
                      className={cx("course-list")}
                      key={i}
                      onClick={() => {
                        setCourse(course.name);
                        showScore(course.CourseId);
                      }}
                    >
                      <button className={cx("course-btn")}>
                        {course.id} - {course.name}
                      </button>
                    </li>
                  );
                })}
            </div>
          </div>
          <div className="col-9">
            <div className={cx("result-table")}>
              <h2 className={cx("container-title")}>
                Grade report for {cookies.user?.username}
              </h2>
              <table className="table mt-5">
                <thead>
                  <tr>
                    <th scope="row">Course</th>
                    <th scope="col">{course}</th>
                  </tr>
                  <tr>
                    <th scope="col" className={cx("col")}>
                      COURSE TOTAL AVERAGE
                    </th>
                    <th scope="col">{scores}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">STATUS</th>
                    <td
                      className={cx("pass")}
                      style={
                        message
                          ? { color: "black" }
                          : !status
                          ? { color: "red" }
                          : {}
                      }
                    >
                      {message ? message : status ? "PASS" : "NOT PASS"}
                    </td>
                  </tr>
                </tbody>
              </table>
              <img src={toad} alt="idea" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InforStudent;
