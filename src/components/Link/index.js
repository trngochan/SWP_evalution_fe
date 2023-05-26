import classNames from 'classnames/bind';
import styles from './Loginbutton.module.scss'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const cx = classNames.bind(styles); 

function Loginbutton({children, to}) {
    return ( 
        <Link  to= {to}> <Button variant="primary" size='lg'>{children}</Button> </Link>
     );
}

export default Loginbutton;