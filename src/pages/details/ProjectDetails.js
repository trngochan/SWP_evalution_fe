import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "~/components/button";
import Infor from "~/components/infor";
import Header from "~/components/layouts/header";

function ProjectDetails() {
  const [students, setStudents] = useState([]);
  const [studentNoInPro, setStudentNoInPro] = useState([]);

  const { project } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/student/${project}/project`);
      setStudents(response.data);
    }
    fetchData();
  });

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
      window.location.reload();
    }
  }

  return (
    <>
      <Header />
      <Infor />
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
      <section>
        <h2 className="mt-5 mb-3">
          List student no in project but in course...
        </h2>
        <Button
          onClick={() => {
            handleShowStdInPrj();
          }}
        >
          Click here to add student into project
        </Button>
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
