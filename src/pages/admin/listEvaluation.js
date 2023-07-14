import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "~/components/button";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";

import AddBoard from "../create/AddBoard";
import styles from "./admin.module.scss";
import Footer from "~/components/layouts/footer";

const cx = classNames.bind(styles);

function ListBoardAdmin() {
  const [semId, setSemId] = useState(0);
  const [boards, setBoards] = useState([]);
  const [semesterList, setsemesterList] = useState([]);
  const [isShowAdd, setShowAdd] = useState(false);
  const [rerender, setRerender] = useState(true);

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
  }, [rerender]);

  function handleChooseSem(semesterId) {
    setSemId(semesterId);
  }

  return (
    <div className="">
      <div className="col-1">
        <Button primary onClick={() => setShowAdd(!isShowAdd)}>
          {isShowAdd ? "View" : "Add"}
        </Button>
      </div>
      {isShowAdd ? (
        <div className="col-11">
          <AddBoard rerender={setRerender} />
        </div>
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
              <option className="text-center" value="0">
                All semester
              </option>
              {semesterList.map((semester, i) => {
                return (
                  <option key={i} value={semester.Id}>
                    {semester.Year} - {semester.Session}{" "}
                  </option>
                );
              })}
            </select>
          </div>

          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Room</th>
                <th scope="col">Time start</th>
                <th scope="col">Time end</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
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
                      <td className="text-center">{item.Id}</td>
                      <td className="text-center">{item.Name}</td>
                      <td className="text-center">{item.Room} </td>
                      <td className="text-center">{item.StartTime} </td>
                      <td className="text-center">{item.EndTime} </td>
                      <td className="text-center">{item.Date.slice(0, 10)} </td>
                      <td className="text-center">
                        <Button to={`/boarddetails/${item.Id}`}>Details</Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default ListBoardAdmin;
