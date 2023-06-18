import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Button from "~/components/button";
import ListStdAdmin from "../admin/listStudentAdmin";
import ListTeacherAdmin from "../admin/listTeacherAdmin";
import ListSemesterAdmin from "../admin/listSemesterAdmin";
import ListSubjectAdmin from "../admin/listSubjectsAdmin";
import ListCourseAdmin from "../admin/listCourse";
import Public from "../create/Public";
import ListProjectAdmin from "../admin/listProjectAdmin";
import ListTemplatesAdmin from "../admin/listTemplates";
import ListBoardAdmin from "../admin/listEvaluation";
import ListScoreColumnAdmin from "../admin/listScoreColumnAdmin";
import Header from "~/components/layouts/header";
import Infor from "~/components/infor";

const cx = classNames.bind(styles);

function HomeAdmin() {
  const [activeButton, setActiveButton] = useState("");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <>
      <Header />
      <Infor />
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("col-3")}>
            <div className={cx("feature-list")}>
              <Button
                onClick={() => handleButtonClick("board")}
                primary={activeButton === "board"}
              >
                Evaluation Board
              </Button>
              <Button
                onClick={() => handleButtonClick("subject")}
                primary={activeButton === "subject"}
              >
                Subject
              </Button>
              <Button
                onClick={() => handleButtonClick("course")}
                primary={activeButton === "course"}
              >
                Course
              </Button>
              <Button
                onClick={() => handleButtonClick("project")}
                primary={activeButton === "project"}
              >
                Project
              </Button>
              <Button
                onClick={() => handleButtonClick("std")}
                primary={activeButton === "std"}
              >
                Student
              </Button>

              <Button
                onClick={() => handleButtonClick("teach")}
                primary={activeButton === "teach"}
              >
                Teacher
              </Button>

              <Button
                onClick={() => handleButtonClick("template")}
                primary={activeButton === "template"}
              >
                Template
              </Button>

              <Button
                onClick={() => handleButtonClick("semester")}
                primary={activeButton === "semester"}
              >
                Semester
              </Button>
              <Button
                onClick={() => handleButtonClick("public")}
                primary={activeButton === "public"}
              >
                Public
              </Button>
              <Button
                onClick={() => handleButtonClick("scorecolumn")}
                primary={activeButton === "scorecolumn"}
              >
                Score Column
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
            {activeButton === "public" && <Public />}
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
