import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Infor from "~/components/infor";
import Header from "~/components/layouts/header";

import classNames from 'classnames/bind';
import styles from './home.module.scss'
import Footer from "~/components/layouts/footer";

const cx = classNames.bind(styles);

function InforStudent() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  axios
    .get("http://localhost:9000/getuser", { withCredentials: true })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      if (data) {
        setUsername(data.username);
      }
    })
    .catch((err) => {
      console.log(err);
      // navigate("/");
    });
  return (
    <div>
      <Header/>
      <Infor name={username}/>
      <table class="table mt-3">
        <thead>
          <tr>
            <th scope="col">TEACHER</th>
            <th scope="col">PRESENTATION</th>
            <th scope="col">DEMO</th>
            <th scope="col">ANSWER</th>
            <th scope="col">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Teacher 1</th>
            <td>5.0</td>
            <td>8.8</td>
            <td>7.5</td>
            <td>7.5</td>
          </tr>
          <tr>
            <th scope="row">Teacher 1</th>
            <td>5.0</td>
            <td>8.8</td>
            <td>7.5</td>
            <td>7.5</td>
          </tr>
        </tbody>
      </table>

      <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col" className={cx('col')}>COURSE TOTAL	AVERAGE</th>
            <th scope="col">7.0</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">STATUS</th>
            <td className={cx('pass')}>PASS</td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default InforStudent;
