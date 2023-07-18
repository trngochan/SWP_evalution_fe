import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "~/components/button";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { Modal, Button as Btn } from "react-bootstrap";
import { Link } from "react-router-dom";

import AddBoard from "../create/AddBoard";
import styles from "./admin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import BoardHeader from "~/components/headeritem";

const cx = classNames.bind(styles);

function ListBoardAdmin() {
  const [semId, setSemId] = useState(0);
  const [boards, setBoards] = useState([]);
  const [semesterList, setsemesterList] = useState([]);
  const [isShowAdd, setShowAdd] = useState(false);
  const [rerender, setRerender] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [subjects, setSubjects] = useState([]);

  const handleClose = (id) => {
    setShowConfirm(false);
  };

  const handleDelete = (id) => {
    setShowConfirm(true);
  };

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/evalution/getall`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/semester/getall`, {
        withCredentials: true,
      });
      const req3 = await axios.get("/subject/getall");

      return axios.all([req1, req2, req3]).then(
        axios.spread((listAvaluation, listSemester, listSubjects) => {
          // Xử lý response từ request1 và requests
          setBoards(listAvaluation.data);
          setsemesterList(listSemester.data);
          setSubjects(listSubjects.data);
        })
      );
    }

    fetchData();
  }, [rerender]);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  return (
    <div className="">
      <div className={cx("container-header")}>
        <BoardHeader message={"Evaluations"} />
        <div className={cx("btns")}>
          <Button active onClick={() => setShowAdd(!isShowAdd)}>
            {isShowAdd ? "View" : "Add+"}
          </Button>
        </div>
      </div>

      {isShowAdd ? (
        <div className="col-11">
          <AddBoard rerender={setRerender} />
        </div>
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
              <option className={cx("text-center selecter")} value="0">
                All semester
              </option>
              {semesterList.map((semester, i) => {
                return (
                  <option key={i} value={semester.Id}>
                    {semester.Year} - {semester.Session}{" "}
                  </option>
                );
              })}
            </select>
          </div>

          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Semester</th>
                <th scope="col">Subject</th>
                <th scope="col">Name</th>
                <th scope="col">Room</th>
                <th scope="col">Time start</th>
                <th scope="col">Time end</th>
                <th scope="col">Date</th>
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
                  const sem = semesterList.find(
                    (semester) => semester.Id === item.SemesterId
                  );
                  const sub = subjects.find(
                    (subject) => subject.Id === item.SubjectId
                  );
                  return (
                    <tr key={index}>
                      <td className="text-center">{item.Id}</td>
                      <td className="text-center">
                        {sem?.Year} - {sem?.Session}
                      </td>
                      <td className="text-center">{sub?.Name}</td>
                      <td className="text-center">
                        <Link
                          to={`/boarddetails/${item.Id}`}
                          className={cx("link-style")}
                        >
                          <FontAwesomeIcon icon={faCircleInfo} /> {item.Name}
                        </Link>
                      </td>
                      <td className="text-center">{item.Room}</td>
                      <td className="text-center">{item.StartTime} </td>
                      <td className="text-center">{item.EndTime} </td>
                      <td className="text-center">{item.Date.slice(0, 10)} </td>
                      <td className="text-center">
                        <button
                          className={cx("btn-dl")}
                          onClick={() => handleDelete()}
                        >
                          <FontAwesomeIcon icon={faTrashCan} /> Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}

      {/* Modal Confirm */}
      <Modal
        show={showConfirm}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>Delete a board</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this Board?
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="primary" className={cx("btn-bt")} onClick={handleClose}>
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
  );
}

export default ListBoardAdmin;
