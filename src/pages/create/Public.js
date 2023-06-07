import React from 'react';

function Public() {
  const data = [
    {
      Name: 'Course 1',
      ProjectId: '1',
      CourseId: '1',
      Note: 'Note 1',
      Public: true,
      Teacher: '2/3',
    },
    {
      Name: 'Course 2',
      ProjectId: '2',
      CourseId: '2',
      Note: 'Note 2',
      Public: false,
      Teacher: '3/3',
    },
  ];

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Project ID</th>
            <th>Course ID</th>
            <th>Note</th>
            <th>Tổng Quan</th>
            <th>Public</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.ProjectId}</td>
              <td>{item.CourseId}</td>
              <td>{item.Note}</td>
              <td>{item.Teacher}</td>
              <td>{item.Public ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Public;
