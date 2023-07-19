import classNames from 'classnames/bind';
import styles from './footer.module.scss'
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGlobe, faEnvelopeCircleCheck, faPhoneVolume, faLocationDot,
    faLock, faRadiation, faMusic, faWifi
} from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faMap } from '@fortawesome/free-regular-svg-icons';
import { faReact } from '@fortawesome/free-brands-svg-icons'
import fptu from '~/components/img/fptu.jpg'

const cx = classNames.bind(styles);

const Footer = () => {
    const [introDetails, setIntroDetails] = useState(false);
    const [contactDetails, setContactDetails] = useState(false);
    const [address, setAddress] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [terms, setTerms] = useState(false);

    const handleClose = () => {
        setIntroDetails(false);
        setContactDetails(false);
        setAddress(false);
        setPrivacy(false);
        setTerms(false);
    }



    const handleOpen = () => {
        setIntroDetails(true);
    }

    const handleOpen1 = () => {
        setContactDetails(true);
    }
    const handleOpen2 = () => {
        setAddress(true);
    }
    const handleOpen3 = () => {
        setPrivacy(true);
    }
    const handleOpen4 = () => {
        setTerms(true);
    }

    return (
        <div className={cx("container-footer")}>
            <div className={cx("container-content")}>
                <div className={cx("img")}><img src={fptu} alt='FPTU' /></div>
                <div className={cx("infor")}>
                    <p onClick={() => { handleOpen() }}>Introduction</p>
                    <p onClick={() => { handleOpen1() }}>Contact</p>
                    <p onClick={() => { handleOpen2() }}>Address</p>
                </div>
                <div className={cx("infor")}>
                    <p onClick={() => { handleOpen3() }}>Privacy</p>
                    <p onClick={() => { handleOpen4() }}>Terms of Use</p>
                    <p><FontAwesomeIcon icon={faMusic} /> <FontAwesomeIcon icon={faWifi} /> <FontAwesomeIcon icon={faReact} /></p>
                </div>
            </div>


            {/* Modal popup intro */}
            <Modal
                show={introDetails}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={cx("modal")}
            >
                <Modal.Header closeButton className={cx("header")}>
                    <Modal.Title><h1><FontAwesomeIcon icon={faGlobe} /> Introduction</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx("body")}>
                    This is an evaluation web application for FPT University lecturers to grade students.
                    We hope that this application will help you manage your evaluation in the best way.
                </Modal.Body>
            </Modal>

            {/* Modal popup contact */}
            <Modal
                show={contactDetails}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={cx("modal")}
            >
                <Modal.Header closeButton className={cx("header-contact")}>
                    <Modal.Title><h1><FontAwesomeIcon icon={faAddressBook} /> Contact</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx("body")}>
                    <p><FontAwesomeIcon icon={faEnvelopeCircleCheck} /> Email: xxx@gmail.com</p>
                    <p><FontAwesomeIcon icon={faPhoneVolume} /> Phone number: 0123456789</p>
                </Modal.Body>
            </Modal>

            {/* Modal popup Address */}
            <Modal
                show={address}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={cx("modal")}
            >
                <Modal.Header closeButton className={cx("header")}>
                    <Modal.Title><h1><FontAwesomeIcon icon={faMap} /> Address</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx("body")}>
                    <p><FontAwesomeIcon icon={faLocationDot} /> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000</p>
                </Modal.Body>
            </Modal>

            {/* Modal popup contact */}
            <Modal
                show={privacy}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={cx("modal")}
            >
                <Modal.Header closeButton className={cx("header")}>
                    <Modal.Title><h1><FontAwesomeIcon icon={faLock} /> Privacy</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx("body")}>
                </Modal.Body>
            </Modal>

            {/* Modal popup contact */}
            <Modal
                show={terms}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={cx("modal")}
            >
                <Modal.Header closeButton className={cx("header-term")}>
                    <Modal.Title><h1><FontAwesomeIcon icon={faRadiation} /> Terms of Use</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx("body")}>
                </Modal.Body>
            </Modal>
        </div >

    );
}

export default Footer;