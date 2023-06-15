import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./details.module.scss";
import classNames from "classnames/bind";

import Button from "~/components/button";
import Infor from "~/components/infor";
import Header from "~/components/layouts/header";
import Divider from "~/components/Divider";

const cx = classNames.bind(styles);

function ProjectDetails() {
  const [students, setStudents] = useState([]);
  const [studentNoInPro, setStudentNoInPro] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [inforProject, setInforProject] = useState({});

  const { project } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/student/${project}/project`);
      const response1 = await axios.get(`/project/${project}/getbyid`);
      setStudents(response.data);
      setInforProject(response1.data?.[0]);
    }
    fetchData();
  }, [rerender]);

  async function handleShowStdInPrj() {
    const response = await axios.get(`/student/${project}/getstdinprj`);

    setStudentNoInPro(response.data.data);
  }

  async function handleAddIntoProject(id) {
    const response = await axios.post(`/studentinproject/add`, {
      student: id,
      project,
    });

    if (response.status === 200) {
      setRerender(!rerender);
      handleShowStdInPrj();
    }
  }

  return (
    <>
      <Header />
      <Infor />
      <div className="row">
        <h2 className={cx("title")}>Information details of project</h2>
        <div className="col-6">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th scope="row">CourseID</th>
                <td>{inforProject.CourseId}</td>
              </tr>
              <tr>
                <th>Project ID</th>
                <td>{inforProject.Id}</td>
              </tr>
              <tr>
                <th>Topic</th>
                <td>{inforProject.Name}</td>
              </tr>
              <tr>
                <th>Notion</th>
                <td>{inforProject.Notion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <section>
        <h2 className="mt-5 mb-3">List student in project...</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student CODE</th>
              <th>Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => (
              <tr key={i}>
                <td>{student.CODE}</td>
                <td>{student.Name}</td>
                <td>{student.Address}</td>
                <td
                  style={{
                    display: "flex",
                  }}
                >
                  <Button>Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Divider />
      <section>
        <div className="d-flex justify-content-between">
          <h2 className="">List student no in project but in course...</h2>
          <button
            className={cx("btn-showadd")}
            onClick={() => {
              handleShowStdInPrj();
            }}
          >
            Click here to add student into project
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Student CODE</th>
              <th>Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentNoInPro.map((student, i) => (
              <tr key={i}>
                <td>{student.Code}</td>
                <td>{student.Name}</td>
                <td>{student.Address}</td>
                <td>
                  <Button onClick={() => handleAddIntoProject(student.Id)}>
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default ProjectDetails;
