import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";

import Button from "~/components/button";
import styles from "./admin.module.scss";
import TableGenerator from '~/pages/generateTable/index'

const cx = classNames.bind(styles);

function ListTemplatesAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get("/template/getall");

      return axios.all([req1]).then(
        axios.spread((templates) => {
          // Xử lý response từ request1 và requests
          setTemplates(templates.data);
        })
      );
    }

    fetchData();
  }, []);

  return (
    <div>
      <Button primary onClick={() => setShowAdd(!isShowAdd)}>
        {isShowAdd ? "View" : "Add"}
      </Button>
      {isShowAdd ? (
        <TableGenerator />
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
                        <td>{template.ApplyDate.slice(0, 10)}</td>
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
