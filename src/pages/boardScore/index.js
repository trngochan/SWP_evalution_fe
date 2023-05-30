import { useState } from "react";
import styles from './boardScore.module.scss';
import classNames from "classnames/bind";
import Header from "~/components/layouts/header";
import Footer from "~/components/layouts/footer";

const cx = classNames.bind(styles);

function TeacherBoardScore() {
  const [scores, setScores] = useState([]);

  const students = ["Minh Tuấn", "Ngọc Hân", "Trung Tín", "Anh Hoàng", "Thủy Trúc"];

  const handleSubmit = (e, index) => {
    e.preventDefault();

    const updatedScores = [...scores];
    const presentationScore = parseFloat(e.target.elements.presentationScore.value);
    const demoScore = parseFloat(e.target.elements.demoScore.value);
    const answerScore = parseFloat(e.target.elements.answerScore.value);
    const totalScore = (demoScore*0.3 + presentationScore*0.4 + answerScore*0.3).toFixed(2);

    updatedScores[index] = totalScore;
    setScores(updatedScores);
  };

  return (
    <div>
      <Header />
      <div>
        <div className={cx('wrapper')}>
          {students.map((student, index) => (
            <form onSubmit={(e) => handleSubmit(e, index)} key={index}>
              <h1>Form chấm điểm {student}</h1>
              <div>
                <label>PRESENTATION:</label>
                <input
                  type="number"
                  name="presentationScore"
                  required
                />
              </div>
              <div>
                <label>DEMO:</label>
                <input
                  type="number"
                  name="demoScore"
                  required
                />
              </div>
              <div>
                <label>ANSWER:</label>
                <input
                  type="number"
                  name="answerScore"
                  required
                />
              </div>
              <div>
                <label>Điểm tổng:</label>
                <input
                  type="text"
                  value={scores[index] || ''}
                  readOnly
                />
              </div>
              <button type="submit">Tính điểm tổng</button>
            </form>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TeacherBoardScore;
