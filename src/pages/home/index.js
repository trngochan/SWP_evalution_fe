import React from "react";
import Header from "~/components/layouts/header";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Loginbutton from "~/components/Link";
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
              <Loginbutton to={"/loginstudent"}>Login for Student</Loginbutton>
            </Col>
            <Col>
              <Loginbutton to={"/loginteacher"}>Login for Teacher</Loginbutton>
            </Col>
            <Col>
              <Loginbutton to={"/loginadmin"}>Login for Admin</Loginbutton>
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
