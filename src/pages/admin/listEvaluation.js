import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "~/components/button";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import AddBoard from "../create/AddBoard";
import styles from "./admin.module.scss";
import Footer from "~/components/layouts/footer";
import Divider from "~/components/Divider";

const cx = classNames.bind(styles);

function ListBoardAdmin() {
  const [boards, setBoards] = useState([]);
  const [semesterList, setsemesterList] = useState([]);
  const [isShowAdd, setShowAdd] = useState(false);
  const [projects, setListProject] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [listProOutBoard, setListProOutBoard] = useState([]);
  const [show, setShow] = useState("add");
  const [boardId, setBoardId] = useState(0);
  const [message, setMessage] = useState("");
  const [teachers, setTeachers] = useState([]);

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
          setBoards(listAvaluation.data);
          setsemesterList(listSemester.data);
        })
      );
    }

    fetchData();
  }, []);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  async function handleShowProjectInB(id) {
    try {
      setBoardId(id);
      setShow("project");
      setMessage("");
      const respone = await axios.get(`/project/${id}/evalution`);
      const data = respone.data;

      for (let i = 0; i < data.length; i++) {
        const response1 = await axios.get(`/teacher/${data[i].id}/quaninboard`);
        const response2 = await axios.get(`/teacher/${data[i].id}/quanmarked`);
        data[i].teacherMark = {
          teacherQuan: response1.data[0].totalTeacher,
          teacherQuanMarked: response2.data[0].totalTeachersMark,
        };
      }
      setListProject(data);
    } catch (error) {}
  }

  async function handShowleProInBoard(id) {
    try {
      setBoardId(id);
      setShow("add");
      setMessage("");
      setBoardId(id);
      const respone = await axios.get(`/project/${id}/projectsnoboard`);
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

  async function handleShowAddTeacher(id) {
    try {
      setBoardId(id);
      const respone = await axios.get(`/teacher/${id}/notinboard`);
      if (respone.status === 200) {
        setShow("teacher");
        setTeachers(respone.data);
      } else {
        setError("Error: at handleShowAddTeacher");
      }
    } catch (error) {}
  }

  async function handleAddTeacherInBoard(teacherId, boardId) {
    const respone = await axios.post("lectureinboard/add", {
      teacherId,
      boardId,
    });
    if (respone.status === 200) {
      setShow("");
      setMessage(respone.data.message);
    } else {
      setError("Error: at handleAddTeacherInBoard");
    }
  }

  async function handleAddProjectInBoard(projectId, boardId, index) {
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
        boardId: boardId,
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
    <div>
      <Button primary onClick={() => setShowAdd(!isShowAdd)}>
        {isShowAdd ? "View" : "Add"}
      </Button>
      {isShowAdd ? (
        <AddBoard />
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
                  <option key={i} value={semester.Id}>
                    {semester.Year} - {semester.Session}{" "}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-10">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Room</th>
                  <th scope="col">Time start</th>
                  <th scope="col">Time end</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {boards
                  .filter(function (item) {
                    if (parseInt(semId) === 0) return true;
                    else return parseInt(item.SemesterId) === parseInt(semId);
                  })
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.Name}</td>
                        <td>{item.Room} </td>
                        <td>{item.StartTime} </td>
                        <td>{item.EndTime} </td>
                        <td>
                          <Button
                            small
                            onClick={() => {
                              handShowleProInBoard(item.Id);
                            }}
                          >
                            Add project
                          </Button>
                          <Button
                            small
                            onClick={() => {
                              handleShowProjectInB(item.Id);
                            }}
                          >
                            Show projects
                          </Button>
                          <Button
                            small
                            onClick={() => {
                              handleShowAddTeacher(item.Id);
                            }}
                          >
                            Add teachers
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {message.length > 0 && <p>{message}</p>}
          {projects.length > 0 && show === "project" && (
            <div className="row">
              <div className="col 5">
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
          )}
          {listProOutBoard.length > 0 && show === "add" && (
            <div className="row">
              <div className="col 5">
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
                                  handleAddProjectInBoard(
                                    item.Id,
                                    boardId,
                                    index
                                  );
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
              </div>
            </div>
          )}
        </>
      )}
      {show === "teacher" && teachers.length > 0 && (
        <div className="row">
          <div className="col 5">
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
                          <Button
                            onClick={() => {
                              handleAddTeacherInBoard(item.Id, boardId);
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
      )}
      <Footer />
    </div>
  );
}

export default ListBoardAdmin;