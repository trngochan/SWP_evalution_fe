import { useState } from "react";
import Button from "~/components/button";
import AddSemester from "../create/AddSemester";

function ListSemesterAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const semesters = ["Tuan", "Han"];

 return (
    <>
      <div>
        <h2 className="mt-3 mb-3">List semesters</h2>
         <Button primary onClick={() => setShowAdd(!isShowAdd)}>{isShowAdd ? "View" : "Add"}</Button>
      </div>
      {isShowAdd ? (
        <AddSemester/>
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
                    <td>{semester}</td>
                    <td>{semester}</td>
                    <td>{semester}</td>
                    <td>{semester}</td>
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
