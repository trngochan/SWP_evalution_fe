import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Infor from "~/components/infor";
import Header from "~/components/layouts/header";
import Footer from "~/components/layouts/footer";

import classNames from "classnames/bind";
import styles from "./home.module.scss";
import { useCookies } from "react-cookie";

const cx = classNames.bind(styles);

function HomeTeacher() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  var EvaluationList = [];
  const [evaluationList, setevaluationList] = useState([]);

  if (!cookies.user) navigate("/");

  useEffect(() => {
    axios
      .get(`http://localhost:9000/evalution/${cookies.user.id}/teacher`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        setevaluationList(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleShowStd() {
    navigate(`/teacherboardscore`)
  }

  return (
    <>
      <Header />
      <Infor name={cookies.user.username} />
      <div className="row mt-3">
        <div className="col-2">
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue={""}
          >
            <option value="0">Select semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
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
                <th scope="col">Semester ID</th>
              </tr>
            </thead>
            <tbody>
              {evaluationList.map((item, index) => (
                <tr key={index}>
                  <td > <a onClick={handleShowStd}>{item.Name}</a> </td>
                  <td>{item.Room} </td>
                  <td>{item.EndTime} </td>
                  <td>{item.StartTime} </td>
                  <td>{item.SemesterId} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeTeacher;
