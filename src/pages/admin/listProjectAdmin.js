import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import Button from "~/components/button";
import AddProject from "../create/AddProject";

import styles from "./admin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ListProjectAdmin() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [isShowAdd, setShowAdd] = useState(false);

  const [projects, setProject] = useState([]);
  const [courses, setCourses] = useState([]);

  const [courID, setCourID] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/project/getall`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/course/getall`, {
        withCredentials: true,
      });

      return axios.all([req1, req2]).then(
        axios.spread((listproject, listCourse) => {
          // Xử lý response từ request1 và requests
          setProject(listproject.data);
          setCourses(listCourse.data);
        })
      );
    }

    fetchData();
  }, []);

  function handleChooseCour(courId) {
    setCourID(courId);
  }

  console.log(projects);

  return (
    <>
      <div>
        <h2
          className="mt-3 mb-3"
          style={{
            textAlign: "center",
          }}
        >
          List projects
        </h2>
        <Button primary onClick={() => setShowAdd(!isShowAdd)}>
          {isShowAdd ? "View" : "Add"}
        </Button>
      </div>
      {isShowAdd ? (
        <AddProject />
      ) : (
        <>
          <div className="col-2">
            <select
              className={cx("form-select")}
              aria-label="Default select example"
              defaultValue={""}
              onClick={(e) => {
                handleChooseCour(e.target.value);
              }}
            >
              <option value="0">All Course</option>
              {courses.map((course, i) => {
                return (
                  <option value={course.id} key={i}>
                    {course.id}-{course.name}
                  </option>
                );
              })}
            </select>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Name</th>
                <th>Notion</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects
                .filter(function (item) {
                  if (parseInt(courID) === 0) return true;
                  else return parseInt(item.CourseId) === parseInt(courID);
                })
                .map((project, i) => (
                  <tr key={i}>
                    <td>{project.Id}</td>
                    <td>{project.Name}</td>
                    <td>{project.Notion}</td>
                    <td
                      style={{
                        display: "flex",
                      }}
                    >
                      <Button to={`/projectdetails/${project.Id}`}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default ListProjectAdmin;
