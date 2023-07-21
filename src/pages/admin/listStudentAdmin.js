import axios from "axios";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import AddStudentList from "~/pages/create/AddStudentList";
import styles from "./admin.module.scss";
import BoardHeader from "~/components/headeritem";
import { toast } from "react-toastify";

import { Modal, Button as Btn } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownLong,
  faArrowUpLong,
  faFileArrowDown,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import _ from "lodash";

const cx = classNames.bind(styles);

function ListStdAdmin() {
  const [students, setStudents] = useState([]);
  const [isShowAdd, setShowAdd] = useState(false);

  const [rerender, setRerender] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [, setSortBy] = useState("asc");
  const [, setSortField] = useState("code");
  const [dataExport, setDataExport] = useState([]);
  const [idDelete, setIdDelete] = useState(0);

  const handleEdit = (id) => {
    setEditId(id);
    setShowModalEdit(true);
  };

  const handleRemove = (id) => {
    setIdDelete(id);
    setShowModalRemove(true);
  };

  const handleClose = () => {
    setShowModalEdit(false);
    setShowModalRemove(false);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(students);
    cloneListUsers = _.orderBy(students, [sortField], [sortBy]);
    setStudents(cloneListUsers);
  };

  const getStudentsExport = (event, done) => {
    let result = [];
    if (students && students.length > 0) {
      result.push(["ID", "Code", "Name", "Birthday", "Address"]);
      students.map((student, index) => {
        let arr = [];
        arr[0] = student.id;
        arr[1] = student.code;
        arr[2] = student.name;
        arr[3] = student.birthday;
        arr[4] = student.address;
        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      birthday: "",
      address: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(5, "Your name must be at least 5 characters long")
        .max(25, "Your name must be under 25 characters long")
        .required("Your name is required"),
      address: yup.string().required("Your address is required"),
      birthday: yup.date().required("Your birthday is required"),
    }),
    onSubmit: (values) => {
      async function fetchData() {
        const formattedDate = moment(values.birthday).format("YYYY-MM-DD");
        values.birthday = formattedDate;
        values.id = editId;
        const response = await axios.put("/student/edit", values);
        if (response.data.status === 200) {
          setRerender(!rerender);
          formik.resetForm();
          handleClose();
        }
      }

      fetchData();
    },
  });

  useEffect(() => {
    async function fetchData() {
      const req1 = await axios.get("/student/getall", {
        withCredentials: true,
      });

      return axios.all([req1]).then(
        axios.spread((listStudent) => {
          // Xử lý response từ request1 và requests
          setStudents(listStudent.data);
        })
      );
    }

    fetchData();
  }, [rerender]);

  async function handleDelete() {
    const req3 = await axios.delete(`/student/${idDelete}`);
    if (req3.data.status === 200) {
      setRerender(!rerender);
      setShowModalRemove(false);
      toast.success("Delele successfully");
    }
  }
  return (
    <>
      <div>
        <div className={cx("container-header")}>
          <div className={cx("title")}>
            <BoardHeader message={"Students"} />
          </div>
          <div className={cx("btn-view-add")}>
            <Button active onClick={() => setShowAdd(!isShowAdd)}>
              {isShowAdd ? "View" : "+Add"}
            </Button>
            <CSVLink
              filename={"students.csv"}
              className="btn btn-primary btn-lg"
              data={dataExport}
              asyncOnClick={true}
              onClick={getStudentsExport}
            >
              <i>
                <FontAwesomeIcon icon={faFileArrowDown} />
              </i>
              Export
            </CSVLink>
          </div>
        </div>
      </div>
      {isShowAdd ? (
        <AddStudentList />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>
                <div className={cx("sort-header")}>
                  <span>Code</span>
                  <span>
                    <i>
                      <FontAwesomeIcon
                        icon={faArrowDownLong}
                        onClick={() => handleSort("desc", "code")}
                      />
                    </i>
                    <i>
                      <FontAwesomeIcon
                        icon={faArrowUpLong}
                        onClick={() => handleSort("asc", "code")}
                      />
                    </i>
                  </span>
                </div>
              </th>
              <th>
                <div className={cx("sort-header")}>
                  <span>Name</span>
                  <span>
                    <i>
                      <FontAwesomeIcon
                        icon={faArrowDownLong}
                        onClick={() => handleSort("desc", "name")}
                      />
                    </i>
                    <i>
                      <FontAwesomeIcon
                        icon={faArrowUpLong}
                        onClick={() => handleSort("asc", "name")}
                      />
                    </i>
                  </span>
                </div>
              </th>
              <th>Adress</th>
              <th>Birthday</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student, i) => {
              return (
                <tr key={i}>
                  <td>{student.id}</td>

                  <td>{student.code}</td>
                  <td>{student.name}</td>
                  <td>{student.address}</td>
                  <td>{student.birthday?.slice(0, 10)}</td>
                  <td className="text-center">
                    <Button edit small onClick={() => handleEdit(students.id)}>
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit
                    </Button>
                    <button
                      className={cx("btn-dl")}
                      onClick={() => handleRemove(student.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} /> Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {/* Modal */}
      <Modal show={showModalEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              className={"form-control"}
              placeholder="Enter Name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name && (
              <span className={"form-message"}>{formik.errors.name}</span>
            )}
            <br />

            <label>Birthday:</label>
            <input
              className={"form-control"}
              placeholder="Enter birth date"
              type="date"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
            />
            {formik.errors.birthday && formik.touched.birthday && (
              <span className={"form-message"}>{formik.errors.birthday}</span>
            )}
            <br />

            <label>Address:</label>
            <input
              className={"form-control"}
              placeholder="Enter address"
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.touched.address && (
              <span className={"form-message"}>{formik.errors.address}</span>
            )}
            <br />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Btn
            variant="secondary"
            onClick={handleClose}
            className={cx("btn-bt")}
          >
            Close
          </Btn>
          <Btn
            type="submit"
            variant="primary"
            onClick={formik.handleSubmit}
            className={cx("btn-bt")}
          >
            Save changes
          </Btn>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModalRemove}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className={cx("modal-title")}>Delete a user</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            This action can't be undone!! Do you want to remove this user ID ={" "}
            {idDelete} ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Btn
            variant="secondary"
            className={cx("btn-bt")}
            onClick={handleClose}
          >
            Close
          </Btn>
          <Btn
            variant="primary"
            className={cx("btn-bt")}
            onClick={handleDelete}
          >
            Confirm
          </Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListStdAdmin;
