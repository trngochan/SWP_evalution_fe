import classNames from "classnames/bind";
import styles from "./header.module.scss";

import fptlogo from "~/components/img/logofpt.png";
import Infor from "~/components/infor";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";


const cx = classNames.bind(styles);


function Header() {
  return (
    <div className={cx("container")}>
      <img className={cx("logo")} alt="FPT" src={fptlogo} />
      <h1 className={cx("title")}><FontAwesomeIcon icon={faGraduationCap} /> FPT EVALUATION PROJECT </h1>
    </div>
  );
}

function Header2() {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const handleImgClick = () => {
    // Điều hướng người dùng đến các trang "home Student", "home teacher", và "home admin"
    const role = cookies.user?.role;
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "std") {
      navigate("/student");
    } else if (role === "teach") {
      navigate("/teacher");
    }
  };

  return (
    <div className={cx("header")}>
      <img className={cx("logo")} alt="FPT" src={fptlogo} onClick={handleImgClick} />
      <h1 className={cx("title")}><FontAwesomeIcon icon={faGraduationCap} /> FPT EVALUATION PROJECT </h1>
      <Infor name={cookies.user?.username} />
    </div>
  )
}



export { Header, Header2 };
