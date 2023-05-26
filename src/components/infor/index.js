import classNames from "classnames/bind";
import styles from "./infor.module.scss";

const cx = classNames.bind(styles);

function Infor({ name }) {
  return (
    <div className={cx("wrapper")}>
        <button className={cx('btn')}><p className={cx("name")}>{name}</p></button>
      <button className={cx('btn',"btn-primary", "btn-logout")}>Logout</button>
    </div>
  );
}

export default Infor;
