import { useEffect, useState } from "react";
import Button from "~/components/button";
import classNames from "classnames/bind";

import styles from "./admin.module.scss";
import AddSubject from "../create/AddSubject";
import axios from "axios";

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
        <>
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, i) => (
                  <tr key={i}>
                    <td>{subject.Id}</td>
                    <td>{subject.Name}</td>
                    <td>{subject.Description}</td>
                    <td>
                      <Button to={`/subjectdetails/${subject.Id}`}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ListSubjectAdmin;
