import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import styles from "./teacher.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ListCourseTeacher() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [semId, setSemId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/course/${cookies.user.id}/teacher`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/semester/getall`, {
        withCredentials: true,
      });

      return axios.all([req1, req2]).then(
        axios.spread((listCourses, listSemester) => {
          // Xử lý response từ request1 và requests
          setCourses(listCourses.data);
          setSemesters(listSemester.data);
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

  return (
    <div className={cx("container")}>
      <div className="row">
        <b className="mb-3 mt-4">List course</b>
        <div className="col-2">
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

        <div className="col-10">
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th scope="col">Course ID</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {courses
                ?.filter(function (item) {
                  if (parseInt(semId) === 0) return true;
                  else return parseInt(item.SemesterId) === parseInt(semId);
                })
                .map((course, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center">{course.id}</td>
                      <td
                        className="text-center"
                        onClick={() => {
                          handleChooseCourse(course);
                        }}
                      >
                        {course.name}
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
