import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useCookies } from "react-cookie";
import styles from "./teacher.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import {
  faPlaneUp,
  faForwardFast,
  faAtom,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "./teacher.module.scss";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function ListBoardTeacher() {
  const navigate = useNavigate();

  const [evaluationList, setevaluationList] = useState([]);
  const [semesterList, setsemesterList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const currentTime = moment().format("YYYY-MM-DD");

  const [semId, setSemId] = useState(0);

  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(
        `${backendURL}/evalution/${cookies.user.id}/teacher`,
        {}
      );
      const req2 = await axios.get(`${backendURL}/semester/getall`, {});
      const req3 = await axios.get(`${backendURL}/subject/getall`);

      return axios.all([req1, req2, req3]).then(
        axios.spread((listAvaluation, listSemester, listSubs) => {
          // Xử lý response từ request1 và requests
          setevaluationList(listAvaluation.data);
          setsemesterList(listSemester.data);
          setSubjects(listSubs.data);
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
      <div className="column mt-3">
        <p className="mb-5">List evaluations of lecturer {cookies.user.name}</p>
        <div className="col-5">
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
        <div className="col-12">
          <Table bordered hover>
            <thead className="text-center">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Semester</th>
                <th scope="col">Subject</th>
                <th scope="col">
                  <FontAwesomeIcon icon={faPaperPlane} /> Name
                </th>
                <th scope="col">Room</th>
                <th scope="col">Date</th>
                <th scope="col">Time start</th>
                <th scope="col">Time end</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {evaluationList
                .filter(function (item) {
                  if (parseInt(semId) === 0) return true;
                  else return parseInt(item.SemesterId) === parseInt(semId);
                })
                .map((item, index) => {
                  const semnow = semesterList.find(
                    (sem) => sem.Id === item.SemesterId
                  );
                  const subnow = subjects.find(
                    (sem) => sem.Id === item.SubjectId
                  );
                  const isSemCurrent =
                    semnow.StartTime.slice(0, 10) <= currentTime &&
                    semnow.EndTime.slice(0, 10) >= currentTime
                      ? 0
                      : currentTime < semnow.StartTime.slice(0, 10)
                      ? 1
                      : -1;
                  return (
                    <tr key={index}>
                      <td className="text-center">{item.Id} </td>
                      <td className="text-center">
                        {semnow?.Year} - {semnow?.Session}{" "}
                      </td>
                      <td className="text-center">{subnow?.Name} </td>
                      <td
                        className="text-center"
                        style={{ color: "#fe2c2c" }}
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
                      <td className="text-center">
                        {item?.Date.slice(0, 10)}{" "}
                      </td>
                      <td className="text-center">{item.StartTime} </td>
                      <td className="text-center">{item.EndTime} </td>
                      {isSemCurrent > 0 ? (
                        <td
                          style={{
                            backgroundColor: "#fe7d7d",
                            fontWeight: "bolder",
                          }}
                        >
                          <FontAwesomeIcon icon={faPlaneUp} />
                          Future
                        </td>
                      ) : isSemCurrent < 0 ? (
                        <td
                          className={cx("text-center")}
                          style={{
                            backgroundColor: "#b3aeae",
                            fontWeight: "bolder",
                          }}
                        >
                          <FontAwesomeIcon icon={faForwardFast} /> Past
                        </td>
                      ) : (
                        <td
                          className={cx("text-center")}
                          style={{
                            backgroundColor: "#9ffd74",
                            fontWeight: "bolder",
                          }}
                        >
                          <FontAwesomeIcon icon={faAtom} /> On going
                        </td>
                      )}
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
