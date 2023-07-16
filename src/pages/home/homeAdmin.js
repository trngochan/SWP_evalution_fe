import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Button from "~/components/button";
import ListStdAdmin from "../admin/listStudentAdmin";
import ListTeacherAdmin from "../admin/listTeacherAdmin";
import ListSemesterAdmin from "../admin/listSemesterAdmin";
import ListSubjectAdmin from "../admin/listSubjectsAdmin";
import ListCourseAdmin from "../admin/listCourse";
import ListProjectAdmin from "../admin/listProjectAdmin";
import ListTemplatesAdmin from "../admin/listTemplates";
import ListBoardAdmin from "../admin/listEvaluation";
import ListScoreColumnAdmin from "../admin/listScoreColumnAdmin";
import { Header2 } from "~/components/layouts/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker, faS, faGraduationCap, faPersonChalkboard, faCalendarDays, faScroll, faLaptopFile, faFilm }
  from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(styles);

function HomeAdmin() {
  const [activeButton, setActiveButton] = useState("board");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <Header2 />
      <div className={cx("container-admin")}>
        <div className={cx("row")}>
          <div className={cx("col-3")}>
            <div className={cx("feature-list")}>
              <Button
                onClick={() => handleButtonClick("board")}
                primary={activeButton === "board"}
              >
                <FontAwesomeIcon icon={faMarker} /> Evaluation Board
              </Button>
              <Button
                onClick={() => handleButtonClick("subject")}
                primary={activeButton === "subject"}
              >
                <FontAwesomeIcon icon={faS} /> Subject
              </Button>
              <Button
                onClick={() => handleButtonClick("course")}
                primary={activeButton === "course"}
              >
                <FontAwesomeIcon icon={faScroll} /> Course
              </Button>
              <Button
                onClick={() => handleButtonClick("project")}
                primary={activeButton === "project"}
              >
                <FontAwesomeIcon icon={faLaptopFile} />  Project
              </Button>
              <Button
                onClick={() => handleButtonClick("std")}
                primary={activeButton === "std"}
              >
                <FontAwesomeIcon icon={faGraduationCap} /> Student
              </Button>

              <Button
                onClick={() => handleButtonClick("teach")}
                primary={activeButton === "teach"}
              >
                <FontAwesomeIcon icon={faPersonChalkboard} /> Lecturer
              </Button>

              <Button
                onClick={() => handleButtonClick("template")}
                primary={activeButton === "template"}
              >
                <FontAwesomeIcon icon={faFilm} />  Template
              </Button>

              <Button
                onClick={() => handleButtonClick("semester")}
                primary={activeButton === "semester"}
              >
                <FontAwesomeIcon icon={faCalendarDays} /> Semester
              </Button>
            </div>
          </div>
          <div className={cx("col-9")}>
            {activeButton === "course" && <ListCourseAdmin />}
            {activeButton === "project" && <ListProjectAdmin />}
            {activeButton === "std" && <ListStdAdmin />}
            {activeButton === "teach" && <ListTeacherAdmin />}
            {activeButton === "semester" && <ListSemesterAdmin />}
            {activeButton === "subject" && <ListSubjectAdmin />}
            {activeButton === "template" && <ListTemplatesAdmin />}
            {activeButton === "board" && <ListBoardAdmin />}
            {activeButton === "scorecolumn" && <ListScoreColumnAdmin />}
          </div>
        </div>
      </div >
    </>
  );
}

export default HomeAdmin;
