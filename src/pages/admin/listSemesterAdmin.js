import { useEffect, useState } from "react";
import Button from "~/components/button";
import AddSemester from "../create/AddSemester";
import axios from "axios";

function ListSemesterAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const [semesters, setsemesters] = useState([]);

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
  }, []);

  console.log(semesters);

  return (
    <>
      <div>
        <h2 className="mt-3 mb-3">List semesters</h2>
        <Button primary onClick={() => setShowAdd(!isShowAdd)}>
          {isShowAdd ? "View" : "Add"}
        </Button>
      </div>
      {isShowAdd ? (
        <AddSemester />
      ) : (
        <>
          <table className="table table-striped">
            <thead>
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
                    <td>{semester.Year}</td>
                    <td>{semester.Session}</td>
                    <td>{semester.StartTime.slice(0, 10)}</td>
                    <td>{semester.EndTime.slice(0, 10)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default ListSemesterAdmin;
