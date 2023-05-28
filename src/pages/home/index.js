import React from "react";
import Header from "~/components/layouts/header";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import LoginButton from "~/components/Link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "~/components/layouts/footer";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("container")}>
      <Header />
      <div className={cx("body")}>
        <Container>
          <Row className={cx("links")}>
            <Col>
              <LoginButton to={"/loginstudent"}>Login for Student</LoginButton>
            </Col>
            <Col>
              <LoginButton to={"/loginteacher"}>Login for Teacher</LoginButton>
            </Col>
            <Col>
              <LoginButton to={"/loginadmin"}>Login for Admin</LoginButton>
            </Col>
            <p className={cx("separate")}></p>
          </Row>
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
