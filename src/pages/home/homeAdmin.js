import Footer from "~/components/layouts/footer";
import Header from "~/components/layouts/header";
import Button from "~/components/button";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { useState } from "react";
import Public from "../create/Public";
import ListStdAdmin from "../admin/listStudentAdmin";
import ListBoardAdmin from "../admin/listEvaluation";
import ListCourseAdmin from "../admin/listCourse";
import ListProjectAdmin from "../admin/listProjectAdmin";
import ListSubjectAdmin from "../admin/listSubjectsAdmin";
import ListTemplatesAdmin from "../admin/listTemplates";
import ListTeacherAdmin from "../admin/listTeacherAdmin";
import ListSemesterAdmin from "../admin/listSemesterAdmin";
import ListScoreColumnAdmin from "../admin/listScoreColumnAdmin";

const cx = classNames.bind(styles);

function HomeAdmin() {
  const [show, setShow] = useState('addstd');
  return (
    <>
      <Header />

      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("col-3")}>
            <div className={cx("feature-list")}>
              <Button onClick={()=>setShow("std")} to="">
                  Student
              </Button>
              <Button onClick={()=>setShow("board")} to="">Evaluation Board</Button>
              <Button onClick={()=>setShow("course")} to="">Course</Button>
              <Button onClick={()=>setShow("project")} to="">Project</Button>
              <Button onClick={()=>setShow("subject")} to="">Subject</Button>
              <Button onClick={()=>setShow("template")} to="">Template</Button>
              <Button onClick={()=>setShow("teach")}  to="">Teacher</Button>
              <Button onClick={()=>setShow("semester")} to="">Semester</Button>
              <Button onClick={()=>setShow("public")} to="">Public</Button>
              <Button onClick={()=>setShow("scorecolumn")} to="">Score Column</Button>
            </div>
          </div>
          <div className={cx("col-9")}>
            {show === "std" && <ListStdAdmin/>}
            {show === "teach" && <ListTeacherAdmin/>}
            {show === "semester" && <ListSemesterAdmin/>}
            {show === "subject" && <ListSubjectAdmin/>}
            {show === "course" && <ListCourseAdmin/>}
            {show === "public" && <Public />}
            {show === "project" && <ListProjectAdmin />}
            {show === "template" && <ListTemplatesAdmin />}
            {show === "board" && <ListBoardAdmin />}
            {show === "scorecolumn" && <ListScoreColumnAdmin />}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default HomeAdmin;
