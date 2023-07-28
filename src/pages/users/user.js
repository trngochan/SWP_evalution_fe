import classNames from "classnames/bind";
import styles from "./user.module.scss";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import Header from "~/components/layouts/header";
import { Header2 } from "~/components/layouts/header";
<<<<<<< HEAD
=======
import Infor from "~/components/infor";
>>>>>>> 3d03884b4fa32aca7f46efeb69e3c5be694af66a
import Footer from "~/components/layouts/footer";

const cx = classNames.bind(styles);

function User() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();

  console.log(cookies);

  return (
    <>
      <Header2 />
      <div className={cx("row")}>
        <h2 className={cx("title")}>User detail</h2>
        <div className="col-6">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Login:</th>
                <td>{cookies.user.username}</td>
              </tr>
              <tr>
                <th scope="row">ID:</th>
                <td>{cookies.user.id}</td>
              </tr>
              <tr>
                <th>Full name:</th>
                <td>{cookies.user.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{cookies.user.username}@fpt.edu.vn</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default User;
