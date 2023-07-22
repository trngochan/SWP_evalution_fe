import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Table from "react-bootstrap/Table";

import { Header2 } from "~/components/layouts/header";
import classNames from "classnames/bind";
import styles from "./teacher.module.scss"

const cx = classNames.bind(styles);

function StudentsInCourse() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [students, setStudent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/student/${cookies.course.id}/course`, {
        withCredentials: true,
      });

      return axios.all([req1]).then(
        axios.spread((listStudent) => {
          // Xử lý response từ request1 và requests
          setStudent(listStudent.data);
        })
      );
    }

    fetchData();
  }, []);

  return (
    <div>
      <Header2 />
      <div className={cx("container-list")}>
        <h2 className="mt-3 mb-3" >
          List student of course {cookies.course.name}
        </h2>
        <Table bordered hover className="text-center">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Adress</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, i) => {
              return (
                <tr key={i}>
                  <td className="text-center">{student.code}</td>
                  <td className="text-center">{student.name}</td>
                  <td className="text-center">{student.address}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default StudentsInCourse;
