import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useCookies } from "react-cookie";
import classNames from "classnames/bind";
import styles from "./teacher.module.scss"

const cx = classNames.bind(styles);

function ListBoardTeacher() {
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
    <div className={cx("container")}>
      <div className="row mt-3">
        <h1 className="mb-5">List evaluations of teacher {cookies.user.name}</h1>
        <div className="col-2">
          <select
            className={cx("form-select")}
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
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Room</th>
                <th scope="col">Date</th>
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
                      <td className="text-center">{item.Id} </td>
                      <td className="text-center"
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
                      <td className="text-center">{item.Room} </td>
                      <td className="text-center">{item?.Date.slice(0, 10)} </td>
                      <td className="text-center">{item.StartTime} </td>
                      <td className="text-center">{item.EndTime} </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ListBoardTeacher;
