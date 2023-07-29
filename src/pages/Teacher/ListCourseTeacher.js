import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import styles from "./teacher.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function ListCourseTeacher() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [semId, setSemId] = useState(0);
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(
        `${backendURL}/course/${cookies.user.id}/teacher`,
        {}
      );
      const req2 = await axios.get(`${backendURL}/semester/getall`, {});
      const req3 = await axios.get(`${backendURL}/subject/getall`);

      return axios.all([req1, req2, req3]).then(
        axios.spread((listCourses, listSemester, listSubs) => {
          // Xử lý response từ request1 và requests
          setCourses(listCourses.data);
          setSemesters(listSemester.data);
          setSubjects(listSubs.data);
        })
      );
    }

    fetchData();
  }, []);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
    console.log(courses);
  }

  function handleChooseCourse(course) {
    setCookie("course", course);
    navigate("/studentsInCourse");
  }

  // console.log(semesters);

  return (
    <div className={cx("container")}>
      <div className="column">
        <h1
          className=""
          style={{
            fontWeight: 700,
          }}
        >
          List of courses the lecturer {cookies.user.name} is teaching
        </h1>
        <div className="col-5">
          <select
            className={cx("form-select")}
            aria-label="Default select example"
            defaultValue={""}
            onClick={(e) => handleChooseSem(e.target.value)}
          >
            <option className="text-center" value="0">
              All semmester
            </option>
            {semesters.map((semester, i) => {
              return (
                <option key={i} value={semester.Id}>
                  {semester.Year} - {semester.Session}{" "}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-12">
          <Table bordered hover className={cx("table")}>
            <thead className="text-center">
              <tr>
                <th scope="col">Semester</th>
                <th scope="col">Subject</th>
                <th scope="col">Course ID</th>
                <th scope="col">
                  <FontAwesomeIcon icon={faSeedling} /> Course
                </th>
              </tr>
            </thead>
            <tbody>
              {courses
                ?.filter(function (item) {
                  if (parseInt(semId) === 0) return true;
                  else return parseInt(item.SemesterId) === parseInt(semId);
                })
                .map((course, i) => {
                  const semnow = semesters.find(
                    (sem) => sem.Id === course.SemesterId
                  );
                  const subnow = subjects.find(
                    (sem) => (sem.Id = course.SubjectId)
                  );
                  return (
                    <tr key={i}>
                      <td className="text-center">
                        {semnow?.Year} - {semnow?.Session}
                      </td>
                      <td className="text-center">{subnow?.Name}</td>
                      <td className="text-center">{course.Id}</td>
                      <td
                        className="text-center"
                        style={{ color: "#fe2c2c" }}
                        onClick={() => {
                          handleChooseCourse(course);
                        }}
                      >
                        {course.Name}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ListCourseTeacher;
