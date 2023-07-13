import classNames from 'classnames/bind';
import styles from './footer.module.scss'
import 'bootstrap/dist/css/bootstrap.css';

const cx = classNames.bind(styles);

function Footer() {
    return ( 
        <footer className={cx('text-light')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                     <div className={cx('col-md-8 col-lg-8 col-xl-8')}>
                        <h3>Giới thiệu</h3> 
                         <p className={cx('mb-0')}>
                         Dự án web chấm điểm môn học là một nền tảng trực tuyến giúp sinh viên và giáo viên đánh giá kết quả học tập. Mục tiêu của dự án là cải thiện chất lượng học tập và tạo sự tương tác dễ dàng giữa sinh viên và giáo viên.
                        </p>
                    </div>
                    <div className={cx('col-md-4 col-lg-4 col-xl-4')}>
                        <h3>Contact</h3>
                        <ul className={cx('list-unstyled')}>
                            <li><i className={cx('fa fa-envelope mr-2')}></i> nghienmohinh@gmail.com</li>
                            <li><i className={cx('fa fa-phone mr-2')}></i> + 123356789</li>
                            <li><i className={cx('fa fa-print mr-2')}></i> + 123356789</li>
                        </ul>
                    </div>
                    {/* <div className={cx('col-md-3 col-lg-3 col-xl-3')}>
                        <h3>Contact</h3>
                        <ul className={cx('list-unstyled')}>
                            <li><i className={cx('fa fa-envelope mr-2')}></i> nghienmohinh@gmail.com</li>
                            <li><i className={cx('fa fa-phone mr-2')}></i> + 123456789</li>
                            <li><i className={cx('fa fa-print mr-2')}></i> + 123456789</li>
                        </ul>
                    </div> */}
                    <div className={cx('col-12 copyright mt-3')}>
                        <p className={cx('float-left')}>
                            <a href="#">Back to top</a>
                        </p>
                        <p className={cx('text-right text-muted')}>created with <i className={cx('fa fa-heart')}></i> by <i>SWP</i></p>
                    </div>                
                 </div>
            </div> 
        </footer>
    );
}

export default Footer;