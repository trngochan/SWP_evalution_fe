import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


import { Header2 } from "~/components/layouts/header";
import Footer from "~/components/layouts/footer";
import ListBoardTeacher from "../Teacher/listBoardTeacher";


import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Button from "~/components/button";
import ListCourseTeacher from "../Teacher/ListCourseTeacher";

const cx = classNames.bind(styles);

function HomeTeacher() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  const [isShowBoard, setIsShowBoard] = useState(false);
  const [isCoursesButtonPrimary, setIsCoursesButtonPrimary] = useState(true);
  const [isEvaluationsButtonPrimary, setIsEvaluationsButtonPrimary] =
    useState(false);

  const handleCourses = () => {
    setIsShowBoard(false);
    setIsCoursesButtonPrimary(true);
    setIsEvaluationsButtonPrimary(false);
  };

  const handleEvaluation = () => {
    setIsShowBoard(true);
    setIsCoursesButtonPrimary(false);
    setIsEvaluationsButtonPrimary(true);
  };

  if (!cookies.user) navigate("/");
  
  return (
    <>
      <Header2 />
      <div className={cx("container-teacher")}>
        <div className={cx("row")}>
          <div className={cx("col-3")}>
            <div className={cx("nav-teacher")}>
              <Button onClick={handleCourses} primary={isCoursesButtonPrimary}>
                Courses
              </Button>
              <Button onClick={handleEvaluation} primary={isEvaluationsButtonPrimary}>
                Evaluations
              </Button>
            </div>
          </div>
          <div className={cx("col-9")}>
            {isShowBoard ? <ListBoardTeacher /> : <ListCourseTeacher />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeTeacher;
