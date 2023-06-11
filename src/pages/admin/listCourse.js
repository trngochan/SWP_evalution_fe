import { useState, useEffect } from "react";
import Button from "~/components/button";
import axios from "axios";
import AddCourse from "../create/AddCourse";

import classNames from "classnames/bind";
import styles from "./admin.module.scss";

const cx = classNames.bind(styles);

function ListCourseAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const [courses, setCourse] = useState([]);
  const [semesterList, setsemesterList] = useState([]);

  const [semId, setSemId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/evalution/getall`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/semester/getall`, {
        withCredentials: true,
      });

      return axios.all([req1, req2]).then(
        axios.spread((listAvaluation, listSemester) => {
          // Xử lý response từ request1 và requests
          setCourse(listAvaluation.data);
          setsemesterList(listSemester.data);
        })
      );
    }

    fetchData();
  }, []);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  return (
    <div>
      <Button primary onClick={() => setShowAdd(!isShowAdd)}>
        {isShowAdd ? "View" : "Add"}
      </Button>
      {isShowAdd ? (
        <AddCourse />
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
              <option value="0">All Course</option>
              {semesterList.map((semester, i) => {
                return (
                  <option value={semester.Id} key={i}>
                    {semester.Year}-{semester.Session}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-10">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Course ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Room</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                </tr>
              </thead>
              <tbody>
                {courses
                  .filter(function (item) {
                    if (parseInt(semId) === 0) return true;
                    else return parseInt(item.SemesterId) === parseInt(semId);
                  })
                  .map((course, i) => (
                    <tr key={i}>
                      <td>{course.Id}</td>
                      <td>{course.Name}</td>
                      <td>{course.Room}</td>
                      <td>{course.StartTime}</td>
                      <td>{course.EndTime}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ListCourseAdmin;
