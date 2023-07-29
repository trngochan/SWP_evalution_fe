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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMarker,
  faS,
  faGraduationCap,
  faPersonChalkboard,
  faCalendarDays,
  faScroll,
  faLaptopFile,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function HomeAdmin() {
  const [activeButton, setActiveButton] = useState("board");

  const handleButtonClick = (buttonname) => {
    setActiveButton(buttonname);
  }

  return (
    <>
      <Header2 />
      <div className={cx("container-admin")}>
        <div className={cx("row")}>
          <div className={cx("col-3")}>
            <div className={cx("feature-list")}>
              <Button
                onClick={() => handleButtonClick("board")}
                small={activeButton === "board"}
                list={activeButton === "board"}
              >
                <FontAwesomeIcon icon={faMarker} /> Evaluation Board
              </Button>
              <Button
                onClick={() => handleButtonClick("subject")}
                small={activeButton === "subject"}
                list={activeButton === "subject"}
              >
                <FontAwesomeIcon icon={faS} /> Subject
              </Button>
              <Button
                onClick={() => handleButtonClick("course")}
                small={activeButton === "course"}
                list={activeButton === "course"}
              >
                <FontAwesomeIcon icon={faScroll} /> Course
              </Button>
              <Button
                onClick={() => handleButtonClick("project")}
                small={activeButton === "project"}
                list={activeButton === "project"}
              >
                <FontAwesomeIcon icon={faLaptopFile} /> Project
              </Button>
              <Button
                onClick={() => handleButtonClick("std")}
                small={activeButton === "std"}
                list={activeButton === "std"}
              >
                <FontAwesomeIcon icon={faGraduationCap} /> Student
              </Button>

              <Button
                onClick={() => handleButtonClick("teach")}
                small={activeButton === "teach"}
                list={activeButton === "teach"}
              >
                <FontAwesomeIcon icon={faPersonChalkboard} /> Lecturer
              </Button>

              <Button
                onClick={() => handleButtonClick("template")}
                small={activeButton === "template"}
                list={activeButton === "template"}
              >
                <FontAwesomeIcon icon={faFilm} /> Template Score
              </Button>

              <Button
                onClick={() => handleButtonClick("semester")}
                small={activeButton === "semester"}
                list={activeButton === "semester"}
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
      </div>
    </>
  );
}

export default HomeAdmin;
