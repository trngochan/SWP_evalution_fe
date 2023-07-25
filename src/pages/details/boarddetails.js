import Button from "~/components/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./details.module.scss";
import classNames from "classnames/bind";
import { Modal, Button as Btn } from "react-bootstrap";

import { Snackbar, Alert } from "@mui/material";
import Table from "react-bootstrap/Table";
import axios from "axios";

import { Header2 } from "~/components/layouts/header";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function BoardDetail() {
  const [show, setShow] = useState("add");
  const [projects, setListProject] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [listProOutBoard, setListProOutBoard] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [teachersnotinboard, setTeachersnotinboard] = useState([]);
  const [projectsPucliced, setProjectsPucliced] = useState([]);

  const [rerender, setRerender] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModalTeachers, setShowModalTeachers] = useState(false);
  const [showModalProjects, setShowModalProjects] = useState(false);
  const [showTableListTeachers, setShowTableListTeachers] = useState(true);
  const [showTableListProjects, setShowTableListProjects] = useState(false);
  const [isTeachersButtonPrimary, setIsTeachersButtonPrimary] = useState(true);
  const [isProjectsButtonPrimary, setIsProjectsButtonPrimary] = useState(false);
  const [boardDetails, setBoardDetails] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowConfirm(false);
  };

  const handleClickDelete = (id) => {
    setIdDelete(id);
    setShowConfirm(true);
  };

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
    setError("");
    setShowTableListTeachers(!showTableListTeachers);
    setShowTableListProjects(false);
    setIsTeachersButtonPrimary(true);
    setIsProjectsButtonPrimary(false);
  };

  const handleShowTableProjects = () => {
    setError("");
    setShowTableListProjects(!showTableListProjects);
    setShowTableListTeachers(false);
    setIsTeachersButtonPrimary(false);
    setIsProjectsButtonPrimary(true);
  };

  const { board } = useParams();
  const [sem, setSem] = useState({});

  useEffect(
    function () {
      try {
        async function fetchData() {
          setShow("project");
          const respone = await axios.get(
            `${backendURL}/project/${board}/evalution`
          );
          const req5 = await axios.get(`${backendURL}/project/getallpubliced`);
          const req6 = await axios.get(`${backendURL}/evalution/${board}`);
          setBoardDetails(req6.data.data[0]);

          const data = respone.data;

          for (let i = 0; i < data.length; i++) {
            const response1 = await axios.get(
              `${backendURL}/teacher/${data[i].id}/quaninboard`
            );
            const response2 = await axios.get(
              `${backendURL}/teacher/${data[i].id}/quanmarked`
            );
            data[i].teacherMark = {
              teacherQuan: response1.data[0].totalTeacher,
              teacherQuanMarked: response2.data[0].totalTeachersMark,
            };
          }
          const respone1 = await axios.get(
            `${backendURL}/teacher/${board}/linb`
          );
          setTeachers(respone1.data);
          setListProject(data);
          setProjectsPucliced(req5.data.data);
        }
        fetchData();
      } catch (error) {
        console.log(1);
      }
    },
    [rerender]
  );

  const [template, setTemplate] = useState({});
  const [subject, setSubject] = useState({});

  useEffect(() => {
    async function fetchData() {
      const req7 = await axios.get(
        `${backendURL}/semester/${boardDetails.SemesterId}`
      );
      setSem(req7.data.data?.[0]);
      const req8 = await axios.get(
        `${backendURL}/subject/${boardDetails.SubjectId}/getbyid`
      );
      const req9 = await axios.get(
        `${backendURL}/template/${boardDetails.TemplateId}`
      );
      setTemplate(req9.data.data?.[0]);
      setSubject(req8.data?.[0]);
    }

    fetchData();
  }, [boardDetails]);

  async function handleShowProInBoard() {
    try {
      setShow("add");
      const respone = await axios.get(
        `${backendURL}/project/${board}/projectsnoboard`
      );
      const data = respone.data;
      if (data.status === 201) {
        setListProOutBoard(data.data);
      }
    } catch (error) {}
  }

  async function handlePublic(id, marked, quan) {
    if (marked === quan && quan > 0) {
      const response = await axios.post(`${backendURL}/project/${id}/public`);
      if (response.data.status === 200) {
        window.location.reload();
        // setError("");
        // setSuccess(response.data.message);
      } else {
        setSuccess("");
        setError(response.data.message);
      }
    }
  }

  async function handleShowAddTeacher() {
    try {
      const respone = await axios.get(
        `${backendURL}/teacher/${board}/notinboard`
      );
      if (respone.status === 200) {
        setShow("teacher");
        setTeachersnotinboard(respone.data);
      } else {
        setError("Error: at handleShowAddTeacher");
      }
    } catch (error) {}
  }

  async function handleAddTeacherInBoard(teacherId) {
    const respone = await axios.post(`${backendURL}/lectureinboard/add`, {
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
        const response = await axios.post(
          `${backendURL}/projectinboard/insert`,
          {
            projectId: projectId,
            boardId: board,
            intendTime: intendTime,
            order: order,
            protectTime: protectTime,
          }
        );

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

  const [openSnackBar, setOpenSnackBar] = useState(false);
  function closeSnackbar() {
    setOpenSnackBar(false);
  }

  async function handleDelete() {
    const req3 = await axios.delete(`${backendURL}/lectureinboard/${idDelete}`);
    if (req3.data.status === 200) {
      setRerender(!rerender);
      setShowConfirm(false);
      toast.success("Delele successfully");
    }
  }

  return (
    <>
      <Header2 />
      <div className={cx("table-1")}>
        <h2 className={cx("title")}>Information details of board</h2>
        <div className="row">
          <div className="col-6">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Board ID</th>
                  <td>{boardDetails?.Id}</td>
                </tr>
                <tr>
                  <th scope="row">Board name</th>
                  <td>{boardDetails?.Name}</td>
                </tr>
                <tr>
                  <th scope="row">Start time</th>
                  <td>{boardDetails?.StartTime}</td>
                </tr>
                <tr>
                  <th scope="row">End time</th>
                  <td>{boardDetails?.EndTime}</td>
                </tr>
                <tr>
                  <th scope="row">Date</th>
                  <td>{boardDetails?.Date?.slice(0, 10)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Room</th>
                  <td>{boardDetails?.Room}</td>
                </tr>
                <tr>
                  <th scope="row">Semester</th>
                  <td>
                    {sem?.Year} - {sem?.Session}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Subject Id</th>
                  <td>
                    <Link
                      to={`/subjectdetails/${subject?.Id}`}
                      className={cx("link-style")}
                    >
                      {subject?.Name}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Template Id</th>
                  <td>
                    <Link
                      to={`/templatedetails/${template?.Id}`}
                      className={cx("link-style")}
                    >
                      {template?.Name}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={cx("table-2")}>
        <div className={cx("title-table")}>
          <Button
            className={cx("btn-show")}
            onClick={handleShowTableTeachers}
            small={isTeachersButtonPrimary}
          >
            <span>List teacher</span>
          </Button>
          <Button
            className={cx("mb-5 mt-5")}
            onClick={handleShowTableProjects}
            small={isProjectsButtonPrimary}
          >
            List project
          </Button>

          <div className={cx("show")}>
            <button
              className={cx("btn-showadd")}
              onClick={() => {
                if (
                  projects.some(
                    (project) => project.teacherMark.teacherQuanMarked > 0
                  )
                ) {
                  setError(
                    "This operation cannot be performed because the evaluation board has been terminated"
                  );
                  setOpenSnackBar(true);
                } else {
                  handleOpenTeachers();
                  handleShowAddTeacher(board);
                }
              }}
            >
              Add teacher into evaluation board
            </button>
            <button
              className={cx("btn-showadd")}
              onClick={() => {
                if (
                  projects.some(
                    (project) => project.teacherMark.teacherQuanMarked > 0
                  )
                ) {
                  setError(
                    "This operation cannot be performed because the evaluation board has been terminated"
                  );
                  setOpenSnackBar(true);
                } else {
                  handleOpenProjects();
                  handleShowProInBoard();
                }
              }}
            >
              Add project into evaluation board
            </button>
          </div>
        </div>

        <div className={cx("table-list")}>
          {showTableListTeachers && (
            <div className="row">
              <Table striped bordered hover>
                <thead className="text-center">
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
                          <td className="text-center">{item.Id}</td>
                          <td className="text-center">{item.Name}</td>
                          <td className="text-center">{item.PhoneNumber}</td>
                          <td className="text-center">
                            <Button small>Details</Button>
                            <button
                              className={cx("btn-dl")}
                              onClick={() => handleClickDelete(item.Id)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} /> Remove
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )}

          <div className="row">
            {showTableListProjects && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Name</th>
                    <th>Note</th>
                    <th>Overview</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td
                          onClick={() => {
                            navigate(
                              `/projectdetails/${item.CourseId}/${item.id}`
                            );
                          }}
                        >
                          {item.name}
                        </td>
                        <td>{item.notion}</td>
                        <td>
                          {item.teacherMark.teacherQuanMarked}/
                          {item.teacherMark.teacherQuan}
                        </td>
                        <td>
                          {projectsPucliced.some(
                            (projectPucliced) =>
                              projectPucliced.ProjectId == item.id
                          ) ? (
                            <button className={cx("btn-publiced")}>
                              Publiced
                            </button>
                          ) : (
                            <Button
                              onClick={() => {
                                if (
                                  item.teacherMark.teacherQuanMarked ==
                                    item.teacherMark.teacherQuan &&
                                  item.teacherMark.teacherQuan > 0
                                ) {
                                  handlePublic(
                                    item.id,
                                    item.teacherMark.teacherQuanMarked,
                                    item.teacherMark.teacherQuan
                                  );
                                } else {
                                  setError("Ineligible for publicity");
                                  setOpenSnackBar(true);
                                }
                              }}
                            >
                              Public
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </div>

        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={closeSnackbar}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>

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
                            <td
                              onClick={() => {
                                handleAddTeacherInBoard(item.Id);
                              }}
                            >
                              <Button>Add</Button>
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
                  <thead className="text-center">
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

        {/* Modal Confirm */}
        <Modal
          show={showConfirm}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>Delete teacher.</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="body-add-new">
              This action can't be undone!! Do you want to remove teacher ID ={" "}
              {idDelete} ?
              <br />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Btn
              variant="primary"
              className={cx("btn-bt")}
              onClick={handleDelete}
            >
              Confirm
            </Btn>
            <Btn
              variant="secondary"
              className={cx("btn-bt")}
              onClick={handleClose}
            >
              Cancel
            </Btn>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default BoardDetail;
