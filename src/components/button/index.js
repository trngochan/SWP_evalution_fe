import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({to, href, children, onClick, primary, active}) {
    let Comp = 'button';
    const props = {
        onClick,
    };

    if(to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a'
    }

    return ( 
        <Comp className={cx('wrapper', {primary, active})} {...props}>
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default Button;