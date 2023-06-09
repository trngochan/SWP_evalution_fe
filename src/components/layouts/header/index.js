import classNames from "classnames/bind";
import styles from "./header.module.scss";

import fptlogo from "~/components/img/logofpt.png";
import Infor from "~/components/infor";
import { useCookies } from "react-cookie";


const cx = classNames.bind(styles);


function Header() {
  return (
    <div className={cx("container")}>
      <img className={cx("logo")} alt="FPT" src={fptlogo} />
      <h1 className={cx("title")}>FPT Evaluation Project</h1>
    </div>
  );
}

function Header2() {
  const [cookies, setCookie] = useCookies();
  return (
    <div className={cx("header")}>
      <img className={cx("logo")} alt="FPT" src={fptlogo} />
      <h1 className={cx("title")}>FPT Evaluation Project</h1>
      <Infor name={cookies.user?.username} />
    </div>
  )
}



export { Header, Header2 };
