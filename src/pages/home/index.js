import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/layouts/header";
import classNames from 'classnames/bind';
import styles from './home.module.scss'
import Loginbutton from "../../components/Link";

const cx = classNames.bind(styles); 

function Home() {
  return (
    <div className="container">
      <Header />
      <Loginbutton to={"/loginstudent"}>Login Student</Loginbutton>
      <Loginbutton to={"/loginteacher"}>Login Teacher</Loginbutton>
      <Loginbutton to={"/loginadmin"}>Login Admin</Loginbutton>
    </div>
  );
}

export default Home;
