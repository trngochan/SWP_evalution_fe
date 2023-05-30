import { useState } from "react";
import styles from "./boardscore.module.scss";
import classNames from "classnames/bind";
import Header from "~/components/layouts/header";
import Button from "~/components/button";

const cx = classNames.bind(styles);

function TeacherBoardScore() {
  const [scores, setScores] = useState([]);

  const students = [
    "Minh Tuấn",
    "Ngọc Hân",
    "Trung Tín",
    "Anh Hoàng",
    "Thủy Trúc",
  ];
  const socreColums = ["Present", "DEMO", "Total"];

  const handleSubmit = (e, index) => {
    e.preventDefault();

    const updatedScores = [...scores];
    const presentationScore = parseFloat(
      e.target.elements.presentationScore.value
    );
    const demoScore = parseFloat(e.target.elements.demoScore.value);
    const answerScore = parseFloat(e.target.elements.answerScore.value);
    const totalScore = (
      demoScore * 0.3 +
      presentationScore * 0.4 +
      answerScore * 0.3
    ).toFixed(2);

    updatedScores[index] = totalScore;
    setScores(updatedScores);
  };

  return (
    <div>
      <Header />
      <div>
        <div className={cx("wrapper")}>
          <table className="table">
            <thead>
              <tr>
                <th ></th>
                {socreColums.map((column) => {
                  return <th >{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => {
                return (
                  <tr>
                    <th>{student}</th>
                    <td><input type="text"/></td>
                    <td><input type="text"/></td>
                    <td><input type="text"/></td>
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
    </div>
  );
}

export default TeacherBoardScore;
