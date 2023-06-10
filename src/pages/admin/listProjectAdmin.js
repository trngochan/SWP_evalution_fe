import { useState } from "react";
import Button from "~/components/button";
import AddProject from "../create/AddProject";

function ListProjectAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const students = ["Tuan", "Han"];

 return (
    <>
      <div>
        <h2 className="mt-3 mb-3">List projects</h2>
         <Button primary onClick={() => setShowAdd(!isShowAdd)}>{isShowAdd ? "View" : "Add"}</Button>
      </div>
      {isShowAdd ? (
        <AddProject/>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Notion</th>
                <th>Course Id</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((student, i) => {
                return (
                  <tr key={i}>
                    <td>{student}</td>
                    <td>{student}</td>
                    <td>
                      <Button>Edit</Button>
                      <Button>Remove</Button>
                    </td>
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

export default ListProjectAdmin;
