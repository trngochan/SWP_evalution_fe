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
  const [cookies] = useCookies();
  if (!cookies.user) {
    window.location.href = "/";
  }

  const [listCourse, setListCourse] = useState([]);
  const [scores, setScores] = useState();
  const [ListColum, setListColumn] = useState([]);

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

  function showScore(id, SubjectId) {
    const req1 = axios.get(`/score/${id}/course`, {
      withCredentials: true,
    });
    const req2 = axios.get(`/scorecolumn/${SubjectId}/subject`);

    return axios
      .all([req1, req2])
      .then(
        axios.spread((response1, response2) => {
          // Xử lý response từ request1 và request2
          console.log(response1.data)
          setScores(response1.data);
          setListColumn(response2.data);
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
                  {ListColum.map((score, index) => {
                    return <th key={index} scope="col">{score.name}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Teacher 1</th>
                  <td>5.0</td>
                  <td>8.8</td>
                  <td>7.5</td>
                  <td>7.5</td>
                </tr>
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
