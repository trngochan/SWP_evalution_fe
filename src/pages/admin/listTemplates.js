import { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import BoardHeader from "~/components/headeritem";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import Button from "~/components/button";
import styles from "./admin.module.scss";
import TableGenerator from "~/pages/generateTable/index";
import AddTemplate from "../create/AddTemplate";
import moment from "moment";
import { Modal, Button as Btn } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function ListTemplatesAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showsCoreDetails, setShowScoreDetails] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [rerender, setRerender] = useState(false);

  const handleClose = () => {
    setShowConfirm(false);
  };

  const handleClickDelete = (id) => {
    setIdDelete(id);
    setShowConfirm(true);
  };

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
  }, [callApi, rerender]);

  const [addTemplate, setAddTemplate] = useState({});
  const [errorTemplate, setErrorTemplate] = useState("");

  async function haddleAddTemplate(dataScoreColumn) {
    try {
      addTemplate.applydate = moment(addTemplate.applydate).format(
        "YYYY-MM-DD"
      );

      const req1 = await axios.post("/template/add", addTemplate);

      if (req1.data.status === 401) {
        setErrorTemplate(req1.data.massage);
        setShowScoreDetails(false);
        return;
      }

      const req2 = await axios.post("scoreColumn/adds", {
        dataColumn: dataScoreColumn,
        templateId: addTemplate.id,
      });

      if (req2.data.status === 200) {
        setShowScoreDetails(false);
        setCallApi(!callApi);
        setShowAdd(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    const req3 = await axios.delete(`/template/${idDelete}`);
    if (req3.data.status === 200) {
      setRerender(!rerender);
      setShowConfirm(false);
      toast.success("Delele successfully");
    }
  }

  return (
    <div className={cx("container")}>
      <div className={cx("container-header")}>
        <div className={cx("title")}>
          <BoardHeader message={"Templates Score"} />
        </div>
        <div className={cx("btn-view-add")}>
          <Button active onClick={() => setShowAdd(!isShowAdd)}>
            {isShowAdd ? "View" : "+Add"}
          </Button>
        </div>
      </div>
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
          <Table bordered hover>
            <thead className="text-center">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Subject Id</th>
                <th scope="col">Status</th>
                <th scope="col">Apply Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => {
                return (
                  <tr>
                    <td className="text-center">{template.Id}</td>
                    <td className="text-center">
                      <Link
                        to={`/templatedetails/${template.Id}`}
                        className={cx("link-style")}
                      >
                        <FontAwesomeIcon icon={faCircleInfo} /> {template.Name}
                      </Link>
                    </td>
                    <td className="text-center">
                      {
                        subjects.find(
                          (subject) => subject.Id === template.SubjectId
                        )?.Name
                      }
                    </td>
                    <td className="text-center">{template.Status.data[0]}</td>
                    <td className="text-center">
                      {template?.ApplyDate?.slice(0, 10)}
                    </td>
                    <td className="text-center">
                      <button
                        className={cx("btn-dl")}
                        onClick={() => handleClickDelete(template.Id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} /> Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}

      {/* Modal Confirm */}
      <Modal
        show={showConfirm}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Delete a template</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this Template ID
            = {idDelete} ?
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="primary"
            className={cx("btn-bt")}
            onClick={handleDelete}
          >
            Confirm
          </Btn>
          <Btn
            variant="secondary"
            className={cx("btn-bt")}
            onClick={handleClose}
          >
            Cancel
          </Btn>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListTemplatesAdmin;
