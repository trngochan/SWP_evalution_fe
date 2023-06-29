import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { useCookies } from "react-cookie";

function ListBoardTecher() {
  const navigate = useNavigate();

  const [evaluationList, setevaluationList] = useState([]);
  const [semesterList, setsemesterList] = useState([]);
  const [semId, setSemId] = useState(0);

  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/evalution/${cookies.user.id}/teacher`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/semester/getall`, {
        withCredentials: true,
      });

      return axios.all([req1, req2]).then(
        axios.spread((listAvaluation, listSemester) => {
          // Xử lý response từ request1 và requests
          setevaluationList(listAvaluation.data);
          setsemesterList(listSemester.data);
        })
      );
    }

    fetchData();
  }, []);

  function handleShowStd(
    avaluationId,
    templateId,
    lectureinboardID,
    nameBoard
  ) {
    setCookie("evaluation_id", avaluationId);
    setCookie("template_id", templateId);
    setCookie("lectureinboard_id", lectureinboardID);
    navigate(`/evaluation/${nameBoard}`);
  }

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  return (
    <div className="row mt-3">
      <h3 className="mb-5">List evaluations of teacher {cookies.user.name}</h3>
      <div className="col-2">
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={""}
          onClick={(e) => handleChooseSem(e.target.value)}
        >
          <option value="0">All semmester</option>
          {semesterList.map((semester, i) => {
            return (
              <option key={i} value={semester.Id}>
                {semester.Year} - {semester.Session}{" "}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col-10">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Room</th>
              <th scope="col">Time start</th>
              <th scope="col">Time end</th>
            </tr>
          </thead>
          <tbody>
            {evaluationList
              .filter(function (item) {
                if (parseInt(semId) === 0) return true;
                else return parseInt(item.SemesterId) === parseInt(semId);
              })
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      onClick={() =>
                        handleShowStd(
                          item.Id,
                          item.TemplateId,
                          item.lectureinboardID,
                          item.Name
                        )
                      }
                    >
                      {" "}
                      {item.Name}
                    </td>
                    <td>{item.Room} </td>
                    <td>{item.StartTime} </td>
                    <td>{item.EndTime} </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ListBoardTecher;
