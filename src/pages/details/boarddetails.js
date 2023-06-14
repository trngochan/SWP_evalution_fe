import Button from "~/components/button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Infor from "~/components/infor";
import Header from "~/components/layouts/header";

function BoardDetail() {
  const [show, setShow] = useState("add");
  const [projects, setListProject] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [listProOutBoard, setListProOutBoard] = useState([]);
  const [boardId, setBoardId] = useState(0);
  const [message, setMessage] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [teachersnotinboard, setTeachersnotinboard] = useState([]);

  const { board } = useParams();

  useEffect(function () {
    try {
      async function fetchData() {
        setShow("project");
        setMessage("");
        const respone = await axios.get(`/project/${board}/evalution`);
        const data = respone.data;

        for (let i = 0; i < data.length; i++) {
          const response1 = await axios.get(
            `/teacher/${data[i].id}/quaninboard`
          );
          const response2 = await axios.get(
            `/teacher/${data[i].id}/quanmarked`
          );
          data[i].teacherMark = {
            teacherQuan: response1.data[0].totalTeacher,
            teacherQuanMarked: response2.data[0].totalTeachersMark,
          };

          const respone1 = await axios.get(`/teacher/${board}/linb`);
          setTeachers(respone1.data);
        }
        setListProject(data);
      }
      fetchData();
    } catch (error) {}
  }, []);

  async function handShowleProInBoard() {
    try {
      setShow("add");
      setMessage("");
      const respone = await axios.get(`/project/${board}/projectsnoboard`);
      const data = respone.data;
      if (data.status === 201) {
        setListProOutBoard(data.data);
      }
    } catch (error) {}
  }

  async function handlePublic(id, marked, quan) {
    if (marked === quan && quan > 0) {
      const response = await axios.post(`/project/${id}/public`);
      if (response.data.status === 200) {
        setError("");
        setSuccess(response.data.message);
        setMessage("");
      } else {
        setSuccess("");
        setError(response.data.message);
      }
    }
  }

  async function handleShowAddTeacher() {
    try {
      const respone = await axios.get(`/teacher/${board}/notinboard`);
      if (respone.status === 200) {
        setShow("teacher");
        setTeachersnotinboard(respone.data);
      } else {
        setError("Error: at handleShowAddTeacher");
      }
    } catch (error) {}
  }

  async function handleAddTeacherInBoard(teacherId) {
    const respone = await axios.post("/lectureinboard/add", {
      teacherId,
      boardId: board,
    });
    if (respone.status === 200) {
      window.location.reload();
      setMessage(respone.data.message);
    } else {
      setError("Error: at handleAddTeacherInBoard");
    }
  }

  async function handleAddProjectInBoard(projectId, index) {
    const intendTimeInput = document.querySelector(
      `input[name=intendTime_${index}]`
    );
    const orderInput = document.querySelector(`input[name=order_${index}]`);
    const protectTimeInput = document.querySelector(
      `input[name=protectTime_${index}]`
    );

    if (intendTimeInput && orderInput && protectTimeInput) {
      const intendTime = intendTimeInput.value; // Lấy giá trị của ô input intend time tương ứng
      const order = orderInput.value; // Lấy giá trị của ô input order tương ứng
      const protectTime = protectTimeInput.value; // Lấy giá trị của ô input protect time tương ứng

      const response = await axios.post("/projectinboard/insert", {
        projectId: projectId,
        boardId: board,
        intendTime: intendTime,
        order: order,
        protectTime: protectTime,
      });

      if (response.status === 200) {
        setShow("");
        setMessage(response.data.message);
      }
    } else {
      console.error("Some input fields are missing");
    }
  }

  return (
    <>
      <Header />
      <Infor />
      <div className="row">
        <Button
          small
          onClick={() => {
            handShowleProInBoard();
          }}
        >
          Add project
        </Button>
        <Button
          small
          onClick={() => {
            handleShowAddTeacher(board);
          }}
        >
          Add teachers
        </Button>
      </div>
      <div className="row">
        <h2 className="mb-5 mt-5">List teacher in evaluation board...</h2>
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>Teacher ID</th>
                <th>Name</th>
                <th>PhoneNumber</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{item.Id}</td>
                      <td>{item.Name}</td>
                      <td>{item.PhoneNumber}</td>
                      <td>
                        <Button>Details</Button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
          </table>
        </div>
        <div className="row ">
          <div className="col-12">
            <h2 className="mb-3 mt-5">List teacher other...</h2>
            <table>
              <thead>
                <tr>
                  <th>Teacher ID</th>
                  <th>Name</th>
                  <th>PhoneNumber</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teachersnotinboard.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{item.Id}</td>
                        <td>{item.Name}</td>
                        <td>{item.PhoneNumber}</td>
                        <td>
                          <Button
                            onClick={() => {
                              handleAddTeacherInBoard(item.Id);
                            }}
                          >
                            Add
                          </Button>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
              {success && <p>{success}</p>}
              {error && <p>{error}</p>}
            </table>
          </div>
        </div>

        <div className="row">
          <h2 className="mb-5 mt-5">List project of evalution...</h2>
          <table>
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Name</th>
                <th>Note</th>
                <th>Tổng Quan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.notion}</td>
                    <td>
                      {item.teacherMark.teacherQuanMarked}/
                      {item.teacherMark.teacherQuan}
                    </td>
                    <td
                      onClick={() =>
                        handlePublic(
                          item.id,
                          item.teacherMark.teacherQuanMarked,
                          item.teacherMark.teacherQuan
                        )
                      }
                    >
                      <button>public</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
          </table>
        </div>
      </div>
      <div className="row">
        <h2 className="mb-5 mt-5">List teacher out evalution...</h2>

        <div className="row">
          <div className="col 5">
            {listProOutBoard.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Name</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listProOutBoard.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td>{item.Id}</td>
                          <td>{item.Name}</td>
                          <td>{item.Notion}</td>
                          <td>
                            <Button
                              onClick={() => {
                                handleAddProjectInBoard(item.Id, index);
                              }}
                            >
                              Add
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              min={1}
                              name={`intendTime_${index}`}
                              placeholder="Enter intend time..."
                              type="time"
                            />
                          </td>
                          <td>
                            <input
                              min={1}
                              name={`order_${index}`}
                              placeholder="Enter order..."
                              type="number"
                            />
                          </td>
                          <td>
                            <input
                              name={`protectTime_${index}`}
                              placeholder="Enter protect time..."
                              type="number"
                            />
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
                {success && <p>{success}</p>}
                {error && <p>{error}</p>}
              </table>
            ) : (
              <h4
                className="ml-5"
                style={{
                  marginLeft: "10px",
                }}
              >
                All project had to evaluate...
              </h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardDetail;
