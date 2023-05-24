import classNames from 'classnames/bind';
import styles from './Loginbutton.module.scss'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles); 

function Loginbutton({children, to}) {
    return ( 
        <Link className={cx("btn")} to= {to}> {children} </Link>
     );
}

export default Loginbutton;