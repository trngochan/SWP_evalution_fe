import classNames from "classnames/bind";
import styles from "./header.module.scss";

import fptImage from "~/components/img/fpt.jpg";

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("container")}>
        <img className={cx("logo")} alt="FPT" src={fptImage}/>
        <h1 className={cx("title")}>FPT evalution project</h1>
    </div>
  );
}

export default Header;
