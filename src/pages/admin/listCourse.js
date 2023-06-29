import { useState, useEffect } from "react";
import Button from "~/components/button";
import axios from "axios";
import { useCookies } from "react-cookie";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";

import AddCourse from "../create/AddCourse";
import styles from "./admin.module.scss";

const cx = classNames.bind(styles);

function ListCourseAdmin() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [isShowAdd, setShowAdd] = useState(false);

  const [courses, setCourse] = useState([]);
  const [semesterList, setsemesterList] = useState([]);

  const [semId, setSemId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/course/getall`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/semester/getall`, {
        withCredentials: true,
      });

      return axios.all([req1, req2]).then(
        axios.spread((listCourse, listSemester) => {
          // Xử lý response từ request1 và requests
          setCourse(listCourse.data);
          setsemesterList(listSemester.data);
        })
      );
    }

    fetchData();
  }, [isShowAdd]);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  function handleShowProjects(id) {
    setCookie("course_id", id);
  }

  return (
    <div>
      <Button primary onClick={() => setShowAdd(!isShowAdd)}>
        {isShowAdd ? "View" : "Add"}
      </Button>
      {isShowAdd ? (
        <AddCourse setShowAdd={setShowAdd} />
      ) : (
        <>
          <div className="col-2">
            <select
              className={cx("form-select")}
              aria-label="Default select example"
              defaultValue={""}
              onClick={(e) => {
                handleChooseSem(e.target.value);
              }}
            >
              <option value="0">All semester</option>
              {semesterList.map((semester, i) => {
                return (
                  <option value={semester.Id} key={i}>
                    {semester.Year}-{semester.Session}
                  </option>
                );
              })}
            </select>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses
                ?.filter(function (item) {
                  if (parseInt(semId) === 0) return true;
                  else return parseInt(item.SemesterId) === parseInt(semId);
                })
                .map((course, i) => (
                  <tr key={i}>
                    <td>{course.id}</td>
                    <td
                      onClick={() => {
                        handleShowProjects(course.id);
                      }}
                    >
                      {course.name}
                    </td>
                    <td>
                      <Button to={`/coursedetails/${course.id}`}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default ListCourseAdmin;
