import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import Infor from "~/components/infor";
import Header from "~/components/layouts/header";
import Footer from "~/components/layouts/footer";

import classNames from 'classnames/bind';
import styles from './home.module.scss'
import Button from "~/components/button";

const cx = classNames.bind(styles); 

function HomeTeacher() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  axios
    .get("http://localhost:9000/getuser", { withCredentials: true })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      if (data) {
        setUsername(data.username);
      } else {
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return (
  <>
    <Header />
    {/* <Infor /> */}
    <div class="row mt-3">
    <div class="col-2">
    <select class="form-select" aria-label="Default select example">
      <option selected>Select semester</option>
      <option value="1">Semester 1</option>
      <option value="2">Semester 2</option>
      <option value="3">Semester 3</option>
    </select>
    </div>
    <div class="col-10">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Phòng</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>
        <Button primary small to={'/evaluation'}>Hội đồng số 1</Button>
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>
      <Button primary small to={'/evaluation'}>Hội đồng số 2</Button>
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>
      <Button primary small to={'/evaluation'}>Hội đồng số 3</Button>
      </td>
    </tr>
  </tbody>
</table>
    </div>
  </div>
    <Footer />
  </>
  );
}

export default HomeTeacher;
