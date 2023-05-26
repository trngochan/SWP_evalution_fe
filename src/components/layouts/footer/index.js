import classNames from "classnames/bind";
import styles from "./footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
    return ( <footer className={cx("container")}>
        <p>footer</p>
    </footer> );
}

export default Footer;