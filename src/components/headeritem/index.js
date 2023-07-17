import classNames from "classnames/bind";
import styles from "./boardheader.module.scss";

const cx = classNames.bind(styles);

function BoardHeader({ message }) {
  return (
    <div className={cx("container-header")}>
      <div className={cx("title")}>
        <h1>{message ? message : "Evaluation Management"}</h1>
      </div>
    </div>
  );
}

export default BoardHeader;
