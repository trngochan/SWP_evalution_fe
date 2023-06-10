import { useState } from "react";
import Button from "~/components/button";
import AddTeacherList from "../create/AddTeacherList";

function ListTeacherAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const teachers = ["Nguyen Van A", "Nguyen Van B",]

  return (
    <>
      <div>
        <h2 className="mt-3 mb-3">List teachers</h2>
         <Button primary onClick={() => setShowAdd(!isShowAdd)}>{isShowAdd ? "View" : "Add"}</Button>
      </div>
      {isShowAdd ? (
        <AddTeacherList/>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Adress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers?.map((teacher, i) => {
                return (
                  <tr key={i}>
                    <td>{teacher}</td>
                    <td>{teacher}</td>
                    <td>{teacher}</td>
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

export default ListTeacherAdmin;
