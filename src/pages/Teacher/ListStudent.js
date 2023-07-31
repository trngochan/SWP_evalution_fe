import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Table from "react-bootstrap/Table";
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

import { Header2 } from "~/components/layouts/header";
import classNames from "classnames/bind";
import styles from "./teacher.module.scss";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function StudentsInCourse() {
  const [cookies, ,] = useCookies();
  const [students, setStudent] = useState([]);
  const [studentnoproject, setStudentnohasproject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [dataExport, setDataExport] = useState([]);

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

  const getStudentsExport = (event, done) => {
    let result = [];
    if (students && students.length > 0) {
      result.push(["Code", "Name", "Project", "Score", "Results"]);
      students.map((student, index) => {
        const p = projects.find((project) => project.Id === student.ProjectId);
        let arr = [];
        arr[0] = student.Code;
        arr[1] = student.Name;
        arr[2] = p.Name;
        arr[3] = student.Score || "No public";
        arr[4] = student.Score
          ? student.Result
            ? "Passed"
            : "Not passed"
          : "No public";
        result.push(arr);
      });
    }

    if (studentnoproject && studentnoproject.length > 0) {
      studentnoproject.map((student, index) => {
        let arr = [];
        arr[0] = student.Code;
        arr[1] = student.Name;
        arr[2] = "Not yet ";
        arr[3] = "Not yet ";
        arr[4] = "Not yet ";
        result.push(arr);
      });
    }

    setDataExport(result);
    done();
  };


  return (
    <div>
      <Header2 />
      <div className={cx("container-list")}>
        <div className={cx("list-header")}>
          <h2 className="mt-3 mb-3">
            List student of course {cookies.course.Name}
          </h2>
          <CSVLink
            filename={`students_${cookies.course.Name}.csv`}
            className="btn btn-primary btn-lg"
            data={dataExport}
            asyncOnClick={true}
            onClick={getStudentsExport}
            style={{ paddingBottom: "0" }}
          >
            <i>
              <FontAwesomeIcon icon={faFileArrowDown} />
            </i>
            Export
          </CSVLink>
        </div>
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
                        ? <span style={{ backgroundColor: "rgb(18, 122, 18)", color: "#fff", padding: "5px" }}>Passed</span>
                        : <span style={{ backgroundColor: "#eb1515", color: "#fff", padding: "5px" }}>Not passed</span>
                      : <span>No public</span>}
                  </td>
                </tr>
              );
            })}
            {studentnoproject?.map((student, i) => {
              return (
                <tr key={i}>
                  <td className="text-center">{student.Code}</td>
                  <td className="text-center">{student.Name}</td>
                  <td className="text-center">{student.Score || ""}</td>
                  <td className="text-center">{student.Score || ""}</td>
                  <td className="text-center"></td>
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
