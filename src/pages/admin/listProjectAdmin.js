import { useState, useEffect } from "react";
import axios from "axios";
import Button from "~/components/button";
import AddProject from "../create/AddProject";

import styles from "./admin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ListProjectAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const [projects, setProject] = useState([]);
  const [courses, setCourses] = useState([]);

  const [semId, setSemId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/project/getall`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/course/getall`, {
        withCredentials: true,
      });

      return axios.all([req1, req2]).then(
        axios.spread((listproject, listSemester) => {
          // Xử lý response từ request1 và requests
          setProject(listproject.data);
          setCourses(listSemester.data);
        })
      );
    }

    fetchData();
  }, []);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  return (
    <>
      <div>
        <h2 className="mt-3 mb-3">List projects</h2>
        <Button primary onClick={() => setShowAdd(!isShowAdd)}>
          {isShowAdd ? "View" : "Add"}
        </Button>
      </div>
      {isShowAdd ? (
        <AddProject />
      ) : (
        <>
          <table className="table table-striped">
            <tbody>
              <select
                className={cx("form-select")}
                aria-label="Default select example"
                defaultValue={""}
                onClick={(e) => {
                  handleChooseSem(e.target.value);
                }}
              >
                <option value="0">All Course</option>
                {courses.map((semester, i) => {
                  return (
                    <option value={semester.Id} key={i}>
                      {semester.Year}-{semester.Session}
                    </option>
                  );
                })}
              </select>
              <table className="table">
                <thead>
                  <tr>
                    <td>Semester ID</td>
                    <td>Name</td>
                    <td>Notion</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {projects
                    .filter(function (item) {
                      if (parseInt(semId) === 0) return true;
                      else return parseInt(item.SemesterId) === parseInt(semId);
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
                          <Button>Edit</Button>
                          <Button>Remove</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default ListProjectAdmin;
