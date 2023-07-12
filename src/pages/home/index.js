import React from "react";
import Header from "~/components/layouts/header";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "~/components/layouts/footer";
import Button from "~/components/button";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("container")}>
      <Header />
      <div className={cx("body")}>
        <Container>
          <Row className={cx("links")}>
            <Col>
              <Button primary to={"/loginstudent"}>Login for Student</Button>
            </Col>
            <Col>
              <Button primary to={"/loginteacher"}>Login for Teacher</Button>
            </Col>
            <Col>
              <Button primary to={"/loginadmin"}>Login for Admin</Button>
            </Col>
          </Row>
            <p className={cx("separate")}></p>
        </Container>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
