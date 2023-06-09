import Footer from "~/components/layouts/footer";
import Header from "~/components/layouts/header";
import Button from "~/components/button";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { useState } from "react";
import AddStudentList from "../create/AddStudentList";
import AddTeacherList from "../create/AddTeacherList";
import AddSemester from "../create/AddSemester";
import AddSubject from "../create/AddSubject";
import AddCourse from "../create/AddCourse";
import Public from "../create/Public";
import AddTemplate from "../create/AddTemplate";
import AddProject from "../create/AddProject";
import AddBoard from "../create/AddBoard";
import AddScoreColumn from "../create/AddScoreColumn";

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
              <Button onClick={()=>setShow("addstd")} to="">
                Add Student
              </Button>
              <Button onClick={()=>setShow("addteach")}  to="">Add Teacher</Button>
              <Button onClick={()=>setShow("semester")} to="">Add Semester</Button>
              <Button onClick={()=>setShow("subject")} to="">Add Subject</Button>
              <Button onClick={()=>setShow("course")} to="">Add Course</Button>
              <Button onClick={()=>setShow("addproject")} to="">Add Project</Button>
              <Button onClick={()=>setShow("addtemplate")} to="">Add Template</Button>
              <Button onClick={()=>setShow("addboard")} to="">Add Board</Button>
              <Button onClick={()=>setShow("addscorecolumn")} to="">Add Score Column</Button>
              <Button onClick={()=>setShow("createeva")} to="">Create Evaluation</Button>
              <Button onClick={()=>setShow("public")} to="">Public</Button>
            </div>
          </div>
          <div className={cx("col-9")}>
            {show === "addstd" && <AddStudentList/>}
            {show === "addteach" && <AddTeacherList/>}
            {show === "semester" && <AddSemester/>}
            {show === "subject" && <AddSubject/>}
            {show === "course" && <AddCourse/>}
            {show === "public" && <Public />}
            {show === "addproject" && <AddProject />}
            {show === "addtemplate" && <AddTemplate />}
            {show === "addboard" && <AddBoard />}
            {show === "addscorecolumn" && <AddScoreColumn />}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default HomeAdmin;
