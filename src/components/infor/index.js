import classNames from "classnames/bind";
import styles from "./infor.module.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Infor({ name }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleLogout = () => {
    Object.keys(cookies).forEach(cookieName => {
      removeCookie(cookieName, { path: '/' });
    });
    navigate('/');
  }

  return (
    <div className={cx("wrapper")}>
        {/* <button className={cx('btn')}><p className={cx("name")}>{name}</p></button> */}
        <button className={cx('btn')}><p className={cx("name")}>{cookies.user.username}</p></button>
      <button onClick={handleLogout} className={cx('btn',"btn-primary", "btn-logout")}>Logout</button>
    </div>
  );
}

export default Infor;
