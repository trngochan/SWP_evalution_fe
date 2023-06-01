import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import styles from "./boardscore.module.scss";
import axios from "axios";
import classNames from "classnames/bind";

import Infor from "~/components/infor";
import Header from "~/components/layouts/header";
import Button from "~/components/button";

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
            setScoreStudents((prev) => [...prev, { stdinprjId: std.stdinprjId }]);
          });
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    };
    fetchData();
  }, []);

  console.log(ScoreList)

  const handleSubmit = (e) => {
    for (let i = 0; i < ScoreStudents.length; i++) {
      e.preventDefault();

      // const updatedScores = [...scores];
      // const presentationScore = parseFloat(
      //   e.target.elements.presentationScore.value
      // );
      // const demoScore = parseFloat(e.target.elements.demoScore.value);
      // const answerScore = parseFloat(e.target.elements.answerScore.value);
      // const totalScore = (
      //   demoScore * 0.3 +
      //   presentationScore * 0.4 +
      //   answerScore * 0.3
      // ).toFixed(2);

      // updatedScores[index] = totalScore;
      // setScores(updatedScores);


      axios
        .post("/score/insert", ScoreStudents[i], {
          withCredentials: true,
        })
        .then((res) => res.data)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  console.log(ScoreStudents);

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
                  return <th key={i}>{column.name}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {studentList?.map((student, i) => {
                return (
                  <tr key={i}>
                    <th>{student.Name}</th>
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
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TeacherBoardScore;
