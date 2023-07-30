import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Table from "react-bootstrap/Table";

import { Header2 } from "~/components/layouts/header";
import classNames from "classnames/bind";
import styles from "./teacher.module.scss";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function StudentsInCourse() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [students, setStudent] = useState([]);
  const [studentnoproject, setStudentnohasproject] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(
        `${backendURL}/score/${cookies.course.Id}/course`,
        {}
      );
      const req2 = await axios.get(
        `${backendURL}/student/${cookies.course.Id}/nothaveproject`
      );
      const req3 = await axios.get(`${backendURL}/project/getall`);

      return axios.all([req1, req2, req3]).then(
        axios.spread((listStudent, listStudentNoProject, listProject) => {
          // Xử lý response từ request1 và requests
          setStudent(listStudent.data.data);
          setStudentnohasproject(listStudentNoProject.data.data);
          setProjects(listProject.data);
        })
      );
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header2 />
      <div className={cx("container-list")}>
        <h2 className="mt-3 mb-3">
          List student of course {cookies.course.Name}
        </h2>
        <Table bordered hover className="text-center">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Project</th>
              <th>Score</th>
              <th>Results</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, i) => {
              const p = projects.find(
                (project) => project.Id === student.ProjectId
              );
              return (
                <tr key={i}>
                  <td className="text-center">{student.Code}</td>
                  <td className="text-center">{student.Name}</td>
                  <td className="text-center">{p.Name}</td>
                  <td className="text-center">
                    {student.Score || "No public"}
                  </td>
                  <td className="text-center">
                    {student.Score
                      ? student.Result
                        ? "Passed"
                        : "Not passed"
                      : "No public"}
                  </td>
                </tr>
              );
            })}
            {studentnoproject?.map((student, i) => {
              return (
                <tr key={i}>
                  <td className="text-center">{student.Code}</td>
                  <td className="text-center">{student.Name}</td>
                  <td className="text-center">
                    {student.Score || "No public"}
                  </td>
                  <td className="text-center">
                    {student.Score
                      ? student.Result
                        ? "Passed"
                        : "Not passed"
                      : "No public"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default StudentsInCourse;
