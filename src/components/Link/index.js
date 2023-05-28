import classNames from 'classnames/bind';
import styles from './Loginbutton.module.scss'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles); 

function LoginButton({children, to}) {
    return ( 
        <Link className={cx("btn")} to= {to}>
            <button className={cx('btn-list')}>
                {children}
            </button>
        </Link>
    );
}

export default LoginButton;