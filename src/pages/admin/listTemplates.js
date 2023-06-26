import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";

import Button from "~/components/button";
import styles from "./admin.module.scss";
import TableGenerator from "~/pages/generateTable/index";
import AddTemplate from "../create/AddTemplate";
import moment from "moment";

const cx = classNames.bind(styles);

function ListTemplatesAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const [templates, setTemplates] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [showsCoreDetails, setShowScoreDetails] = useState(false);

  const [callApi, setCallApi] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get("/template/getall");
      const req2 = await axios.get("/subject/getall");

      return axios.all([req1, req2]).then(
        axios.spread((templates, subjects) => {
          // Xử lý response từ request1 và requests
          setTemplates(templates.data);
          setSubjects(subjects.data);
        })
      );
    }

    fetchData();
  }, [callApi]);

  const [addTemplate, setAddTemplate] = useState({});
  const [addScoreColumn, setAddScoreColumn] = useState({});
  const [errorTemplate, setErrorTemplate] = useState("");

  console.log(addTemplate);
  console.log(addScoreColumn);

  async function haddleAddTemplate(dataScoreColumn) {
    try {
      addTemplate.applydate = moment(addTemplate.applydate).format(
        "YYYY-MM-DD"
      );

      const req1 = await axios.post("/template/add", addTemplate);

      if (req1.data.status == 401) {
        setErrorTemplate(req1.data.massage);
        setShowScoreDetails(false);
        return;
      }

      const req2 = await axios.post("scoreColumn/adds", {
        dataColumn: dataScoreColumn,
        templateId: addTemplate.id,
      });

      if (req2.data.status == 200) {
        setShowScoreDetails(false);
        setCallApi(!callApi);
        setShowAdd(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Button primary onClick={() => setShowAdd(!isShowAdd)}>
        {isShowAdd ? "View" : "Add"}
      </Button>
      {isShowAdd ? (
        <>
          {showsCoreDetails ? (
            <TableGenerator haddleAddTemplate={haddleAddTemplate} />
          ) : (
            <AddTemplate
              subjects={subjects}
              onUpdataDataTemplate={setAddTemplate}
              onSetShowScoreDetails={setShowScoreDetails}
              errorTemplate={errorTemplate}
            />
          )}
        </>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Subject Id</th>
                <th scope="col">Status</th>
                <th scope="col">Apply Date</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => {
                return (
                  <tr>
                    <td>{template.Id}</td>
                    <td>{template.Name}</td>
                    <td>{template.SubjectId}</td>
                    <td>{template.Status.data[0]}</td>
                    <td>{template?.ApplyDate?.slice(0, 10)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default ListTemplatesAdmin;
