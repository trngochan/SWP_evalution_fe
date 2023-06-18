import axios from "axios";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import AddStudentList from "~/pages/create/AddStudentList";

import { Modal, Button as Btn } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";

function ListStdAdmin() {
  const [students, setStudent] = useState([]);
  const [isShowAdd, setShowAdd] = useState(false);

  const [rerender, setRerender] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
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
          setStudent(listStudent.data);
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
        <>
          <table className="table table-striped">
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
                      <Button onClick={() => handleEdit(student.id)}>
                        Edit
                      </Button>
                      <Button>Remove</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={formik.handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListStdAdmin;
