import React from "react";
import Header from "~/components/layouts/header";
import { useState } from "react";
import styles from './boardscore.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function TeacherBoardScore() {
    const [practicalScore, setPracticalScore] = useState('');
    const [presentationScore, setPresentationScore] = useState('');
    const [totalScore, setTotalScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tính điểm tổng
    const total = parseFloat(practicalScore) + parseFloat(presentationScore);
    setTotalScore(total.toFixed(2));
  };
    return ( 
        <div>
            <Header />
            <div>
      <h1>Form chấm điểm học sinh 1</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Điểm thực hành:</label>
          <input
            type="number"
            value={practicalScore}
            onChange={(e) => setPracticalScore(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Điểm thuyết trình:</label>
          <input
            type="number"
            value={presentationScore}
            onChange={(e) => setPresentationScore(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Điểm tổng:</label>
          <input
            type="text"
            value={totalScore}
            readOnly
          />
        </div>
        <button type="submit">Tính điểm tổng</button>
      </form>
    </div>
        </div>    
    );
}

export default TeacherBoardScore;