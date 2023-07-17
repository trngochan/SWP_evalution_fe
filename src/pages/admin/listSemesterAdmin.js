import Button from "~/components/button";
import AddSemester from "../create/AddSemester";
import styles from "./admin.module.scss";
import classNames from "classnames/bind";



import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Modal, Button as Btn } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);


function ListSemesterAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);
  const [semesters, setsemesters] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClose = () => {
    setShowConfirm(false);
  }

  const handleDelete = (id) => {
    setShowConfirm(true);
  }

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

  console.log(rerender);

  return (
    <>
      <div>
        <h2 className="mt-3 mb-3">List semesters</h2>
        <Button primary onClick={() => setShowAdd(!isShowAdd)}>
          {isShowAdd ? "View" : "Add"}
        </Button>
      </div>
      {isShowAdd ? (
        <AddSemester rerender={setRerender} />
      ) : (
        <Table striped bordered hover>
          <thead className="text-center">
            <tr>
              <th>Year</th>
              <th>Session</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {semesters?.map((semester, i) => {
              return (
                <tr key={i}>
                  <td className="text-center">{semester.Year}</td>
                  <td className="text-center">{semester.Session}</td>
                  <td className="text-center">{semester.StartTime.slice(0, 10)}</td>
                  <td className="text-center">{semester.EndTime.slice(0, 10)}</td>
                  <td className="text-center">
                    <button className={cx("btn-dl")} onClick={() => handleDelete()}><FontAwesomeIcon icon={faTrashCan} /> Remove</button>
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
          <Modal.Title><h1>Delete a Semester</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this Semester?
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
    </>
  );
}

export default ListSemesterAdmin;
