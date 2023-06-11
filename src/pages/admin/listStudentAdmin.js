import axios from "axios";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import AddStudentList from "~/pages/create/AddStudentList";

function ListStdAdmin() {
  const [students, setStudent] = useState([]);
  const [isShowAdd, setShowAdd] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get("/student/getall", {
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
    <>
      <div>
        <h2 className="mt-3 mb-3">List students</h2>
        <Button primary onClick={() => setShowAdd(!isShowAdd)}>
          {isShowAdd ? "View" : "Add"}
        </Button>
      </div>
      {isShowAdd ? (
        <AddStudentList />
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
              {students?.map((student, i) => {
                return (
                  <tr key={i}>
                    <td>{student.code}</td>
                    <td>{student.name}</td>
                    <td>{student.address}</td>
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

export default ListStdAdmin;
