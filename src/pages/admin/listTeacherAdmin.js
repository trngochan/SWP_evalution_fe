import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./admin.module.scss";

import Button from "~/components/button";
import AddTeacherList from "../create/AddTeacherList";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";

import { Modal, Button as Btn } from "react-bootstrap";

const cx = classNames.bind(styles);

function ListTeacherAdmin() {
  const [isShowAdd, setShowAdd] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [edit, setEdit] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/teacher/getall");
      setTeachers(response.data);
    }

    fetchData();
  }, [rerender]);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);

  const handleEdit = (id) => {
    setEdit(id);
    setShowModalEdit(true);
  };

  const handleRemove = (name) => {
    setShowModalRemove(true);
    setSelectedCode(name);
  };

  const handleClose = () => {
    setShowModalEdit(false);
    setShowModalRemove(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phonenumber: "",
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
      phonenumber: yup.number().required("Your phone number is required"),
    }),
    onSubmit: (values) => {
      const formattedDate = moment(values.birthday).format("YYYY-MM-DD");
      values.birthday = formattedDate;
      values.id = edit;
      async function fetchData() {
        const response = await axios.put("/teacher/edit", values);
        if (response.data.status === 200) {
          setRerender(!rerender);
          formik.resetForm();
          handleClose();
        }
      }

      fetchData();
    },
  });

  return (
    <>
      <div>
        <h2 className="mt-3 mb-3">List teachers</h2>
        <Button primary onClick={() => setShowAdd(!isShowAdd)}>
          {isShowAdd ? "View" : "Add"}
        </Button>
      </div>
      {isShowAdd ? (
        <AddTeacherList />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Birthday</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers?.map((teacher, i) => {
              return (
                <tr key={i}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.phonenumber}</td>
                  <td>{JSON.stringify(teacher.birthday).slice(1, 11)}</td>
                  <td>
                    <Button edit small onClick={() => handleEdit(teacher.id)}>
                      Edit
                    </Button>
                    <Button
                      remove
                      small
                      onClick={() => handleRemove(teacher.name)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <div>
        {/* Modal */}
        <Modal show={showModalEdit} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Teacher</Modal.Title>
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

              <label>Phone number:</label>
              <input
                className={"form-control"}
                placeholder="Enter phone number"
                type="string"
                name="phonenumber"
                value={formik.values.phonenumber}
                onChange={formik.handleChange}
              />
              {formik.errors.phonenumber && formik.touched.phonenumber && (
                <span className={"form-message"}>
                  {formik.errors.phonenumber}
                </span>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={formik.handleSubmit}>
              Save changes
            </Button>
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
              This action can't be undone!! Do you want to remove this user?
              <br />
              <b>Name = "{selectedCode}" </b>
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
              onClick={formik.handleSubmit}
            >
              Confirm
            </Btn>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default ListTeacherAdmin;
