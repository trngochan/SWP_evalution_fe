import Button from "~/components/button";
import AddSemester from "../create/AddSemester";
import styles from "./admin.module.scss";
import classNames from "classnames/bind";
import BoardHeader from "~/components/headeritem";
import moment from "moment";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Modal, Button as Btn } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ListSemesterAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);
  const [semesters, setsemesters] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const currentTime = moment().format("YYYY-MM-DD");
  const handleClose = () => {
    setShowConfirm(false);
  };

  const handleClickDelete = (id) => {
    setIdDelete(id);
    setShowConfirm(true);
  };

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get("/semester/getall");

      return axios.all([req1]).then(
        axios.spread((semesters) => {
          // Xử lý response từ request1 và requests
          setsemesters(semesters.data);
        })
      );
    }

    fetchData();
  }, [rerender]);

  async function handleDelete() {
    const req3 = await axios.delete(`/semester/${idDelete}`);
    if (req3.data.status === 200) {
      setRerender(!rerender);
      setShowConfirm(false);
      toast.success("Delele successfully");
    }
  }

  return (
    <div>
      <div className={cx("container-header")}>
        <div className={cx("title")}>
          <BoardHeader message={"Semesters"} />
        </div>
        <div className={cx("btn-view-add")}>
          <Button active onClick={() => setShowAdd(!isShowAdd)}>
            {isShowAdd ? "View" : "+Add"}
          </Button>
        </div>
      </div>
      {isShowAdd ? (
        <AddSemester rerender={setRerender} />
      ) : (
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Year</th>
              <th>Session</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {semesters?.map((semester, i) => {
              const isSemCurrent =
                semester.StartTime.slice(0, 10) <= currentTime &&
                semester.EndTime.slice(0, 10) >= currentTime
                  ? 0
                  : currentTime < semester.StartTime.slice(0, 10)
                  ? 1
                  : -1;
              return (
                <tr key={i}>
                  <td className="text-center">{semester.Id}</td>
                  <td className="text-center">{semester.Year}</td>
                  <td className="text-center">{semester.Session}</td>
                  <td className="text-center">
                    {semester.StartTime.slice(0, 10)}
                  </td>
                  <td className="text-center">
                    {semester.EndTime.slice(0, 10)}
                  </td>
                  {isSemCurrent > 0 ? (
                    <td>Future</td>
                  ) : isSemCurrent < 0 ? (
                    <td>Pass</td>
                  ) : (
                    <td>On going</td>
                  )}
                  <td className="text-center">
                    <button
                      className={cx("btn-dl")}
                      onClick={() => handleClickDelete(semester.Id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} /> Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
            <h1>Delete a Semester</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this Semester ID
            = {idDelete} ?
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
  );
}

export default ListSemesterAdmin;
