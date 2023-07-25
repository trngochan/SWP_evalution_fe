import React from "react";
import classNames from "classnames/bind";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./evaluation.module.scss";
import Footer from "~/components/layouts/footer";
import { Header2 } from "~/components/layouts/header";
import Button from "~/components/button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function Evaluation() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [projectList, setProjectList] = useState([]);
  const [projectsMarked, setProjectMarked] = useState([]);
  const { nameboard } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(
        `${backendURL}/project/${cookies.evaluation_id}/evalution`,
        {
          withCredentials: true,
        }
      );

      const req2 = await axios.get(
        `${backendURL}/project/${cookies.lectureinboard_id}/getprojectmarked`
      );

      return axios.all([req1, req2]).then(
        axios.spread((Projects, projectsMarked) => {
          // Xử lý response từ request1 và requests
          setProjectList(Projects.data);
          setProjectMarked(projectsMarked.data.result);
        })
      );
    }

    fetchData();
  }, []);

  function handleShowStd(id, isMarked) {
    setCookie("project_id", id);
    navigate(`/teacherboardscore/${isMarked ? "marked" : "nomarked"}`, {
      replace: true,
    });
  }

  // console.log(projectsMarked);
  // console.log(projectList);

  return (
    <>
      <Header2 />
      <div className={cx("container")}>
        <div className={cx("col-md-5 col-lg-5 col-xl-5")}>
          <h1>List projects in board {nameboard}</h1>
        </div>

        <div className={cx("col-md-7 col-lg-7 col-xl-7")}>
          <ul>
            {projectList.map((project, index) => {
              const isMarked = projectsMarked.some(
                (e) => parseInt(e.ProjectId) === parseInt(project.id)
              );

              return (
                <li
                  key={index}
                  onClick={() => handleShowStd(project.id, isMarked)}
                >
                  <Button
                    onClick={() => {
                      setCookie("course_id", project.CourseId);
                    }}
                    small
                    to={"/teacherboardscore"}
                  >
                    {project.name}
                    {isMarked && (
                      <span>
                        {" "}
                        (
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          style={{ color: "#55b112" }}
                        />
                        )
                      </span>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
        <div></div>
      </div>

      <Footer />
    </>
  );
}

export default Evaluation;
