import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import styles from "./boardscore.module.scss";
import axios from "axios";
import classNames from "classnames/bind";

import Infor from "~/components/infor";
import Header from "~/components/layouts/header";
import Button from "~/components/button";
import Footer from "~/components/layouts/footer";

const cx = classNames.bind(styles);

function TeacherBoardScore() {
  const [scores, setScores] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [studentList, setStudentList] = useState([]);
  const [ScoreList, setScoreList] = useState([]);
  const [ScoreStudents, setScoreStudents] = useState([]);

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

  console.log(ScoreList);

  const handleSubmit = (e) => {
    for (let i = 0; i < ScoreStudents.length; i++) {
      e.preventDefault();

      axios
        .post("/score/insert", ScoreStudents[i], {
          withCredentials: true,
        })
        .then((res) => res.data)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  console.log(studentList);

  return (
    <div>
      <Header />
      <Infor />
      <div>
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
              {studentList?.map((student, i) => {
                return (
                  <tr key={i}>
                    <th>
                      {student.CODE} - {student.Name}
                    </th>
                    {ScoreList.map((column, i) => {
                      return (
                        <td key={i}>
                          <input
                            type="text"
                            onChange={(e) => {
                              setScoreStudents((prev) => {
                                let index = prev.findIndex(
                                  (obj) => obj.stdinprjId === student.stdinprjId
                                );
                                prev[index][column.id] = e.target.value;
                                return [...prev];
                              });
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={cx("btn-submit")}>
            <Button primary onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default TeacherBoardScore;
