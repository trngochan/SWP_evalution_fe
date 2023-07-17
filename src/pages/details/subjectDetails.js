import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";

import { Header2 } from "~/components/layouts/header";
import styles from "./details.module.scss";
import Divider from "~/components/Divider";
import Button from "~/components/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button as Btn } from "react-bootstrap";



const cx = classNames.bind(styles);

function SubjectDetails() {
  const { subject } = useParams();
  const [courses, setCourses] = useState([]);
  const [inforSubject, setInforSubject] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClose = () => {
    setShowConfirm(false);
  }

  const handleDelete = (id) => {
    setShowConfirm(true);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/subject/${subject}/getbyid`);
      const response1 = await axios.get(`/course/${subject}/getbysubject`);
      setCourses(response1.data);
      setInforSubject(response.data?.[0]);
    }
    fetchData();
  }, []);

  console.log(courses);
  return (
    <>
      <Header2 />
      <div className={cx("table-1")}>
        <h2 className={cx("title")}>Information details of subject</h2>
        <div className="col-6">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Subject ID</th>
                <td>{inforSubject.Id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{inforSubject.Name}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{inforSubject.Description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={cx("table-2")}>
        <Divider />
        <div className="row">
          <th
            style={{
              fontSize: "20px",
            }}
          >
            List course in subject
          </th>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>Semester ID</th>
                <th>Course ID</th>
                <th>Name</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, i) => (
                <tr key={i}>
                  <td className="text-center">{course.SemesterId}</td>
                  <td className="text-center">{course.id}</td>
                  <td className="text-center">{course.name}</td>
                  <td className="text-center">
                    <Button to={`/coursedetails/${course.id}`}>Details</Button>
                    <button className={cx("btn-dl")} onClick={() => handleDelete()}><FontAwesomeIcon icon={faTrashCan} /> Remove</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal Confirm */}
      <Modal
        show={showConfirm}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><h1>Delete a subject.</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this subject?
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

export default SubjectDetails;
