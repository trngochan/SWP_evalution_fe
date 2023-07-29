import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import axios from "axios";
import BoardHeader from "~/components/headeritem";
import { toast } from "react-toastify";

import Button from "~/components/button";
import styles from "./admin.module.scss";
import AddSubject from "../create/AddSubject";
import { Modal, Button as Btn } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function ListSubjectAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [semester, setSemesters] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [rerender, setRerender] = useState(false);

  const handleClose = () => {
    setShowConfirm(false);
  };

  const handleClickDelete = (id) => {
    setIdDelete(id);
    setShowConfirm(true);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${backendURL}/subject/getall`);
      const response1 = await axios.get(`${backendURL}/semester/getall`);

      setSubjects(response.data);
      setSemesters(response1.data);
    }

    fetchData();
  }, [rerender]);

  async function handleDelete() {
    const req3 = await axios.delete(`${backendURL}/subject/${idDelete}`);
    if (req3.data.status === 200) {
      setRerender(!rerender);
      setShowConfirm(false);
      toast.success("Delele successfully");
    }
  }

  return (
    <div className={cx("container")}>
      <div className={cx("container-header")}>
        <BoardHeader message={"Subjects"} />
        <div className={cx("btn-view-add")}>
          <Button active onClick={() => setShowAdd(!isShowAdd)}>
            {isShowAdd ? "View" : "+Add"}
          </Button>
        </div>
      </div>
      {isShowAdd ? (
        <AddSubject />
      ) : (
        <Table bordered hover>
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, i) => (
              <tr key={i}>
                <td className="text-center">{subject.Id}</td>
                <td className="text-center">
                  <Link
                    to={`/subjectdetails/${subject.Id}`}
                    className={cx("link-style")}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} /> {subject.Name}
                  </Link>
                </td>
                <td>{subject.Description}</td>
                <td className="text-center">
                  <button
                    className={cx("btn-dl")}
                    onClick={() => handleClickDelete(subject.Id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} /> Remove
                  </button>
                </td>
              </tr>
            ))}
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
            <h2>Delete a subject</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this Subject ID
            = {idDelete}?
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

export default ListSubjectAdmin;
