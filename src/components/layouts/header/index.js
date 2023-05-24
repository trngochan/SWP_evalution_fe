import classNames from 'classnames/bind';
import styles from './header.module.scss'

const cx = classNames.bind(styles); 

function Header() {
    return ( <div className={cx("container")}>
        <h1 className={cx("title")}>FPT evalution project</h1>

    </div> );
}

export default Header;