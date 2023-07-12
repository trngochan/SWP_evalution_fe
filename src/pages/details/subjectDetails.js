import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";

import { Header2 } from "~/components/layouts/header";
import styles from "./details.module.scss";
import Divider from "~/components/Divider";
import Button from "~/components/button";

const cx = classNames.bind(styles);

function SubjectDetails() {
  const { subject } = useParams();
  const [courses, setCourses] = useState([]);
  const [inforSubject, setInforSubject] = useState({});

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
            <thead>
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
                  <td>{course.SemesterId}</td>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>
                    <Button to={`/coursedetails/${course.id}`}>Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default SubjectDetails;
