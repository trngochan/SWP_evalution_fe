import axios from "axios";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import AddStudentList from "~/pages/create/AddStudentList";
import styles from './admin.module.scss'

import { Modal, Button as Btn } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import classNames from "classnames/bind";
import Table from 'react-bootstrap/Table';

const cx = classNames.bind(styles);

function ListStdAdmin() {
  const [students, setStudents] = useState([]);
  const [isShowAdd, setShowAdd] = useState(false);

  const [rerender, setRerender] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  

  const handleEdit = (id) => {
    setEditId(id);
    setShowModalEdit(true);
  };

  const handleRemove = (id, name) => {
    setShowModalRemove(true);
    setEditId(id);
    setSelectedCode(name);
  };
  
  

  const handleClose = () => {
    setShowModalEdit(false);
    setShowModalRemove(false)
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

  return (
    <>
      <div>
        <h2 className="mt-3 mb-3">List students</h2>
        <Button primary onClick={() => setShowAdd(!isShowAdd)}>
          {isShowAdd ? "View" : "Add"}
        </Button>
      </div>
      {isShowAdd ? (
        <AddStudentList />
      ) : (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Adress</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {students?.map((student, i) => {
                return (
                  <tr key={i}>
                    <td>{student.code}</td>
                    <td>{student.name}</td>
                    <td>{student.address}</td>
                    <td>
                      <Button edit small onClick={() => handleEdit(students.id)}>
                        Edit
                      </Button>
                      <Button remove small onClick={() => handleRemove(students.id, student.name)}>Remove</Button>
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
          <Btn variant="secondary" onClick={handleClose} className={cx('btn-bt')}>
            Close
          </Btn>
          <Btn type="submit" variant="primary" onClick={formik.handleSubmit} className={cx('btn-bt')}>
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
              <Modal.Title><h1 className={cx('modal-title')}>Delete a user</h1></Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className='body-add-new'>
                  This action can't be undone!!
                  Do you want to remove this user?  
                  <br />
                  <b>Name = "{selectedCode}" </b>
              </div>
          </Modal.Body>
          <Modal.Footer>
              <Btn variant="secondary" className={cx('btn-bt')} onClick={handleClose}>
                  Close
              </Btn>
              <Btn variant="primary" className={cx('btn-bt')} onClick={formik.handleSubmit}>
                  Confirm
              </Btn>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default ListStdAdmin;
