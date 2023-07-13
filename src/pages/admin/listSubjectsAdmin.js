import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Table from 'react-bootstrap/Table';
import axios from "axios";

import Button from "~/components/button";
import styles from "./admin.module.scss";
import AddSubject from "../create/AddSubject";

const cx = classNames.bind(styles);

function ListSubjectAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("subject/getall");
      const response1 = await axios.get("semester/getall");

      setSubjects(response.data);
      setSemesters(response1.data);
    }

    fetchData();
  }, []);

  console.log(semesters);
  return (
    <div>
      <Button primary onClick={() => setShowAdd(!isShowAdd)}>
        {isShowAdd ? "View" : "Add"}
      </Button>
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
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ListSubjectAdmin;
