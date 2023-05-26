import classNames from 'classnames/bind';
import styles from './footer.module.scss'
import 'bootstrap/dist/css/bootstrap.css';

const cx = classNames.bind(styles);

function Footer() {
    return ( 
        <footer className={cx('text-light')}>
            <div className={cx('container')}>
                <div className={cx('row')}>
                     <div className={cx('col-md-4 col-lg-4 col-xl-4')}>
                        <h5>Giới thiệu</h5> 
                         {/* <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25">  */}
                         <p className={cx('mb-0')}>
                            Nếu bạn là một Wibu chính hiệu, thì còn chần chờ gì nữa mà không tậu ngay một em mô hình về để trưng bày.
                        </p>
                    </div>
                    <div className={cx('col-md-4 col-lg-4 col-xl-4')}>
                        <h5>Contact</h5>
                        {/* <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25"> */}
                        <ul className={cx('list-unstyled')}>
                            <li><i className={cx('fa fa-envelope mr-2')}></i> nghienmohinh@gmail.com</li>
                            <li><i className={cx('fa fa-phone mr-2')}></i> + 123456789</li>
                            <li><i className={cx('fa fa-print mr-2')}></i> + 123456789</li>
                        </ul>
                        <ul className={cx('list-unstyled')}>
                            <li><i className={cx('fa fa-envelope mr-2')}></i> nghienmohinh@gmail.com</li>
                            <li><i className={cx('fa fa-phone mr-2')}></i> + 123456789</li>
                            <li><i className={cx('fa fa-print mr-2')}></i> + 123456789</li>
                        </ul>

                    </div>
                    <div className={cx('col-md-4 col-lg-4 col-xl-4')}>
                        <h5>Giới thiệu</h5> 
                         {/* <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25">  */}
                         <p className={cx('mb-0')}>
                            Nếu bạn là một Wibu chính hiệu, thì còn chần chờ gì nữa mà không tậu ngay một em mô hình về để trưng bày.
                        </p>
                    </div>
                    
                    
                    <div className={cx('col-12 copyright mt-3')}>
                        <p class={cx('float-left')}>
                            <a href="#">Back to top</a>
                        </p>
                        <p className={cx('text-right text-muted')}>created with <i className={cx('fa fa-heart')}></i> by <i>Team08</i></p>
                    </div>                  
                 </div>
            </div> 
        </footer>
    );
}

export default Footer;