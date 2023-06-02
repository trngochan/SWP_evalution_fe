import axios from "axios";
import { useEffect, useState } from "react";
import Infor from "~/components/infor";
import Header from "~/components/layouts/header";
import { useCookies } from "react-cookie";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Footer from "~/components/layouts/footer";

const cx = classNames.bind(styles);

function InforStudent() {
  const [cookies, setCookie, removeCookie] = useCookies();
  if (!cookies.user) {
    // window.location.href = "/";
  }

  const [listCourse, setListCourse] = useState([]);
  const [scores, setScores] = useState();
  const [ListColum, setListColumn] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);

  useEffect(() => {
    axios
      .get(`/course/${cookies.user.id}/student`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        setListCourse(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function showScore(courseId, SubjectId) {
    setCookie("course_id", courseId);
    const req1 = axios.get(`/score/${courseId}/course`, {
      withCredentials: true,
    });
    const req2 = axios.get(`/scorecolumn/${SubjectId}/subject`, {
      withCredentials: true,
    });
    const req3 = axios.get(`/teacher/courAndStd`, {
      withCredentials: true,
    });

    return axios
      .all([req1, req2, req3])
      .then(
        axios.spread((score, listColumns, listTeach) => {
          // Xử lý response từ request1 và request2
          setScores(score.data);
          setListColumn(listColumns.data);
          setListTeacher(listTeach.data);
          console.log(listColumns.data);
          console.log(listTeach.data);
          console.log(score.data);
          // setListTeacher(listTeach.data);
        })
      )
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  return (
    <div>
      <Header />
      <Infor name={cookies.user?.username} />
      <div className={cx("container")}>
        <div className="row">
          <div className="col-3">
            {listCourse.map((course, i) => {
              return (
                <li
                  key={i}
                  onClick={() => showScore(course.CourseId, course.SubjectId)}
                >
                  {course.name}
                </li>
              );
            })}
          </div>
          <div className="col-9">
            <table className="table mt-3">
              <thead>
                <tr>
                  <th scope="col"></th>
                  {ListColum.map((column, index) => {
                    return (
                      <th key={index} scope="col">
                        {column.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {listTeacher.map((teacher, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{teacher.Name}</th>
                      {scores.filter((score) => score.LectureInBoardId === teacher.lectureinboardId).map((score, i) => {
                        return <td key={i}>{score.Score}</td>
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col" className={cx("col")}>
                    COURSE TOTAL AVERAGE
                  </th>
                  <th scope="col">7.0</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">STATUS</th>
                  <td className={cx("pass")}>PASS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InforStudent;
