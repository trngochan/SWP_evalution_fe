import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import BoardHeader from "~/components/headeritem";

import Button from "~/components/button";
import styles from "./admin.module.scss";
import AddSubject from "../create/AddSubject";
import { Modal, Button as Btn } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ListSubjectAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClose = () => {
    setShowConfirm(false);
  }

  const handleDelete = (id) => {
    setShowConfirm(true);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("subject/getall");
      const response1 = await axios.get("semester/getall");

      setSubjects(response.data);
      setSemesters(response1.data);
    }

    fetchData();
  }, []);


  return (
    <div className={cx("container-board")}>
      <div className={cx("container-header")}>
        <BoardHeader />
        <div className={cx("btn-view-add")}>
          <Button active onClick={() => setShowAdd(!isShowAdd)}>
            {isShowAdd ? "View" : "Add+"}
          </Button>
        </div>
      </div>
      {isShowAdd ? (
        <AddSubject />
      ) : (
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {subjects.map((subject, i) => (
              <tr key={i}>
                <td className="text-center">{subject.Id}</td>
                <td className="text-center">{subject.Name}</td>
                <td>{subject.Description}</td>
                <td className="text-center">
                  <Button to={`/subjectdetails/${subject.Id}`}>
                    <FontAwesomeIcon icon={faCircleInfo} /> Details
                  </Button>
                  <button className={cx("btn-dl")} onClick={() => handleDelete()}><FontAwesomeIcon icon={faTrashCan} /> Remove</button>
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
          <Modal.Title><h2>Delete a subject</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this Subject?
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="primary" className={cx("btn-bt")} onClick={handleClose}>
            Confirm
          </Btn>
          <Btn variant="secondary" className={cx("btn-bt")} onClick={handleClose}>
            Cancel
          </Btn>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListSubjectAdmin;
