import Button from "~/components/button";
import AddSemester from "../create/AddSemester";

import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

function ListSemesterAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const [semesters, setsemesters] = useState([]);
  const [rerender, setRerender] = useState(false);

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
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ListSemesterAdmin;
