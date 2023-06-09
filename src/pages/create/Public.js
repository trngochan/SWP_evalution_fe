import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Public() {
  const [listProject, setListProject] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get("/project/getall");
        const data = response.data;

        for (let i = 0; i < data.length; i++) {
          const response1 = await axios.get(`/teacher/${data[i].Id}/quaninboard`);
          const response2 = await axios.get(`/teacher/${data[i].Id}/quanmarked`);
          data[i].teacherMark = {
            teacherQuan : response1.data[0].totalTeacher,
            teacherQuanMarked : response2.data[0].totalTeachersMark
          };
        }
        setListProject(data)
      }

      fetchData();
    } catch (error) {}
  }, []);

  function handlePublic() {
    
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Project ID</th>
            <th>Name</th>
            <th>Note</th>
            <th>Tổng Quan</th>
            <th>Public</th>
          </tr>
        </thead>
        <tbody>
          {listProject.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.CourseId}</td>
                <td>{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Notion}</td>
                <td>
                  {item.teacherMark.teacherQuanMarked}/{item.teacherMark.teacherQuan}
                </td>
                <td onClick={()=> handlePublic()}>{item.Public ? "Yes" : "No"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Public;
