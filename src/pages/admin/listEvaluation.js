import axios from "axios";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import AddBoard from "../create/AddBoard";
import styles from "./admin.module.scss";

const cx = classNames.bind(styles);

function ListBoardAdmin() {
  const [boards, setBoards] = useState([]);
  const [semesterList, setsemesterList] = useState([]);
  const [isShowAdd, setShowAdd] = useState(false);
  const [projects, setListProject] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [semId, setSemId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`/evalution/getall`, {
        withCredentials: true,
      });
      const req2 = await axios.get(`/semester/getall`, {
        withCredentials: true,
      });

      return axios.all([req1, req2]).then(
        axios.spread((listAvaluation, listSemester) => {
          // Xử lý response từ request1 và requests
          setBoards(listAvaluation.data);
          setsemesterList(listSemester.data);
        })
      );
    }

    fetchData();
  }, []);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  async function handleShowProjectInB(id) {
    try {
      const respone = await axios.get(`/project/${id}/evalution`);
      const data = respone.data;

      for (let i = 0; i < data.length; i++) {
        const response1 = await axios.get(`/teacher/${data[i].id}/quaninboard`);
        const response2 = await axios.get(`/teacher/${data[i].id}/quanmarked`);
        data[i].teacherMark = {
          teacherQuan: response1.data[0].totalTeacher,
          teacherQuanMarked: response2.data[0].totalTeachersMark,
        };
      }
      setListProject(data);
    } catch (error) {}
  }

  async function handlePublic(id, marked, quan) {
    if (marked === quan && quan > 0) {
      const response = await axios.post(`/project/${id}/public`);
      if (response.data.status === 200) {
        setError("");
        setSuccess(response.data.message);
      } else {
        setSuccess("");
        setError(response.data.message);
      }
    }
  }
  return (
    <div>
      <Button primary onClick={() => setShowAdd(!isShowAdd)}>
        {isShowAdd ? "View" : "Add"}
      </Button>
      {isShowAdd ? (
        <AddBoard />
      ) : (
        <>
          <div className="col-2">
            <select
              className={cx("form-select")}
              aria-label="Default select example"
              defaultValue={""}
              onClick={(e) => {
                handleChooseSem(e.target.value);
              }}
            >
              <option value="0">All semester</option>
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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Room</th>
                  <th scope="col">Time start</th>
                  <th scope="col">Time end</th>
                </tr>
              </thead>
              <tbody>
                {boards
                  .filter(function (item) {
                    if (parseInt(semId) === 0) return true;
                    else return parseInt(item.SemesterId) === parseInt(semId);
                  })
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td
                          onClick={() => {
                            handleShowProjectInB(item.Id);
                          }}
                        >
                          {item.Name}
                        </td>
                        <td>{item.Room} </td>
                        <td>{item.StartTime} </td>
                        <td>{item.EndTime} </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {projects.length > 0 && (
            <div className="row">
              <div className="col 5">
                <table>
                  <thead>
                    <tr>
                      <th>Project ID</th>
                      <th>Name</th>
                      <th>Note</th>
                      <th>Tổng Quan</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.notion}</td>
                          <td>
                            {item.teacherMark.teacherQuanMarked}/
                            {item.teacherMark.teacherQuan}
                          </td>
                          <td
                            onClick={() =>
                              handlePublic(
                                item.id,
                                item.teacherMark.teacherQuanMarked,
                                item.teacherMark.teacherQuan
                              )
                            }
                          >
                            <button>public</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {success && <p>{success}</p>}
                  {error && <p>{error}</p>}
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ListBoardAdmin;
