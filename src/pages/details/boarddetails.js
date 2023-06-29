import Button from "~/components/button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./details.module.scss";
import classNames from "classnames/bind";
import { Modal, Button as Btn } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";

import axios from "axios";

import Infor from "~/components/infor";
import Header from "~/components/layouts/header";
import Divider from "~/components/Divider";

const cx = classNames.bind(styles);

function BoardDetail() {
  const [show, setShow] = useState("add");
  const [projects, setListProject] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [listProOutBoard, setListProOutBoard] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [teachersnotinboard, setTeachersnotinboard] = useState([]);

  const [rerender, setRerender] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModalTeachers, setShowModalTeachers] = useState(false);
  const [showModalProjects, setShowModalProjects] = useState(false);
  const [showTableListTeachers, setShowTableListTeachers] = useState(true);
  const [showTableListProjects, setShowTableListProjects] = useState(false);
  const [isTeachersButtonPrimary, setIsTeachersButtonPrimary] = useState(true);
  const [isProjectsButtonPrimary, setIsProjectsButtonPrimary] = useState(false);

  const handleOpenTeachers = () => {
    setShowModalTeachers(true);
  };

  const handleOpenProjects = () => {
    setShowModalProjects(true);
  };

  const handleCloseTeachers = () => {
    setShowModalTeachers(false);
  };

  const handleCloseProjects = () => {
    setShowModalProjects(false);
  };

  const handleShowTableTeachers = () => {
    setShowTableListTeachers(!showTableListTeachers);
    setShowTableListProjects(false);
    setIsTeachersButtonPrimary(true);
    setIsProjectsButtonPrimary(false);
  };

  const handleShowTableProjects = () => {
    setShowTableListProjects(!showTableListProjects);
    setShowTableListTeachers(false);
    setIsTeachersButtonPrimary(false);
    setIsProjectsButtonPrimary(true);
  };

  const { board } = useParams();

  useEffect(
    function () {
      try {
        async function fetchData() {
          setShow("project");
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
    },
    [rerender]
  );

  async function handleShowProInBoard() {
    try {
      setShow("add");
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

      if (intendTime.length > 0 && protectTime.length > 0 && order.length > 0) {
        const response = await axios.post("/projectinboard/insert", {
          projectId: projectId,
          boardId: board,
          intendTime: intendTime,
          order: order,
          protectTime: protectTime,
        });

        if (response.status === 200) {
          setRerender(!rerender);
          handleCloseProjects();
          handleShowProInBoard();
          setError("");
        }
      } else {
        setError("Some input fields are missing");
      }
    } else {
      setError("Some input fields are missing");
    }
  }

  return (
    <>
      <Header />
      <Infor />
      <div className={cx("title-table")}>
        <Button
          className={cx("btn-show")}
          onClick={handleShowTableTeachers}
          primary={isTeachersButtonPrimary}
        >
          <span>List teacher</span>
        </Button>
        <Button
          className={cx("mb-5 mt-5")}
          onClick={handleShowTableProjects}
          primary={isProjectsButtonPrimary}
        >
          List project
        </Button>

        <div className={cx("show")}>
          <button
            className={cx("btn-showadd")}
            onClick={() => {
              handleOpenTeachers();
              handleShowAddTeacher(board);
            }}
          >
            Teacher on assessment
          </button>
          <button
            className={cx("btn-showadd")}
            onClick={() => {
              handleOpenProjects();
              handleShowProInBoard();
            }}
          >
            Project listings no reviews
          </button>
        </div>
      </div>

      <div className={cx("table-list")}>
        {showTableListTeachers && (
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
            </table>
          </div>
        )}

        {/* <Divider /> */}

        <div className="row">
          {showTableListProjects && (
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
                        <Button>Public</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Divider />

      {/* Modal */}
      <Modal
        show={showModalTeachers}
        onHide={handleCloseTeachers}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="">List teacher other...</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between"></div>
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
        </Modal.Body>
      </Modal>

      {/* modal add project */}
      <Modal
        show={showModalProjects}
        onHide={handleCloseProjects}
        dialogClassName="custom-modal"
        className={cx("custom-modal")}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>List project out evaluation...</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listProOutBoard.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Name</th>
                    <th>Note</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listProOutBoard.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr key={index}>
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
                  ))}
                </tbody>
              </table>
              {error && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                  }}
                >
                  {error}
                </p>
              )}
            </div>
          ) : (
            <h4 className="ml-5" style={{ marginLeft: "10px" }}>
              All projects have been evaluated...
            </h4>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BoardDetail;
