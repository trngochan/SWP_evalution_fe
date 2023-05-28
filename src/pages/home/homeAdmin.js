import Footer from "~/components/layouts/footer";
import Header from "~/components/layouts/header";
import Button from "~/components/button";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { useState } from "react";
import AddStudentList from "../create/AddStudentList";

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
              <Button onClick={()=>setShow("createeva")} to="">Create Evaluation</Button>
              <Button onClick={()=>setShow("addproject")} to="">Add Project</Button>
            </div>
          </div>
          <div className={cx("col-9")}>
            {show == "addstd" && <AddStudentList/>}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default HomeAdmin;
