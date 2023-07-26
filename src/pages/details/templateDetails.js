import styles from "./details.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { Header2 } from "~/components/layouts/header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "~/components/button";
import { Table } from "react-bootstrap";
import backendURL from "~/URL_BACKEND/urlbackend";

const cx = classNames.bind(styles);

function TemplateDetail() {
  const { id } = useParams();
  const [template, setTemplate] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [scoreColumn, setScoreColumn] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get(`${backendURL}/template/${id}`, {});
      const req2 = await axios.get(`${backendURL}/subject/getall`);
      const req3 = await axios.get(`${backendURL}/scorecolumn/${id}/subject`);

      return axios.all([req1, req2, req3]).then(
        axios.spread((templ, listSub, listScore) => {
          // Xử lý response từ request1 và requests
          setTemplate(templ.data.data?.[0]);
          setSubjects(listSub.data);
          setScoreColumn(listScore.data.data);
        })
      );
    }

    fetchData();
  }, [id]);

  function handleClickSubject(id) {
    navigate(`/subjectdetails/${id}`);
  }

  console.log(scoreColumn);
  return (
    <div>
      <Header2 />
      <div className={cx("table-1")}>
        <h2 className={cx("title")}>Information details of Template</h2>
        <div className="row">
          <div className="col-6">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th scope="row">Template ID</th>
                  <td>{template?.Id}</td>
                </tr>
                <tr>
                  <th scope="row">Template name</th>
                  <td>{template?.Name}</td>
                </tr>
                <tr>
                  <th scope="row">Subject </th>
                  <td
                    onClick={() => {
                      handleClickSubject(template?.SubjectId);
                    }}
                  >
                    {
                      subjects.find(
                        (subject) => subject.Id === template?.SubjectId
                      )?.Name
                    }
                  </td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  <td>1</td>
                </tr>
                <tr>
                  <th scope="row"> Apply Date</th>
                  <td>{template.ApplyDate?.slice(0, 10)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={cx("table-2")}>
        <div className={cx("title-table")}>
          <Button className={cx("mb-5 mt-5 show")} small={true}>
            List score column
          </Button>
        </div>
        <div className="table-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Score column ID</th>
                <th className="text-center">Score name</th>
                <th className="text-center">Percent</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {scoreColumn.map((score) => (
                <tr>
                  <td className="text-center">{score.id}</td>
                  <td className="text-center">{score.name}</td>
                  <td className="text-center">{score.percent * 100} %</td>
                  <td className="text-center">
                    {
                      <button className={cx("btn-dl")}>
                        <FontAwesomeIcon icon={faTrashCan} /> Remove
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default TemplateDetail;
