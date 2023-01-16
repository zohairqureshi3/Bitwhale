import React from 'react';
import {Container, Image} from 'react-bootstrap';
import Logo from '../../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer>
            <div className="footer-bg">
                <Container fluid className="custom-box">
                    <div className="footer-header">
                        <div className="footer-circle"></div>
                        <div className="row">
                            <div className="col-lg-4 mb-lg-0 mb-5">
                                <a href="" className="footer-mb d-block"> 
                                    <figure className="mb-0">
                                        <Image src={Logo} alt="" fluid />
                                    </figure>
                                </a>
                                <p className="site-text">Etiam neq grtyuio dlioue nulla, consequat maximus pellentesque vitae, semp er fihbhid justo aecenas molestie tincidunt neqrevue sed facilisis.onec finibus scelerisque nisl, quis vulputatsto aecenas mo swcstie tincidunt neque sed facilisid justo aecenas molesti.</p>
                                <div className="read-button">
                                    <a href="" className="read-btn">Read more<FontAwesomeIcon className="fa" icon={faAngleRight} /></a>
                                </div>
                                <h3 className="text-capitalize footer-mb">community</h3>
                                <div className="social-icons">
                                    <ul>
                                        <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                                        <li><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                                        <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                        <li><a href="#"><FontAwesomeIcon icon={faYoutube} /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-7 offset-lg-1">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 mb-lg-0 mb-4">
                                        <h3 className="text-capitalize footer-mb">about us</h3>
                                        <ul className="footer-links">
                                            <li><a href="">about</a></li>
                                            <li><a href="">careers</a></li>
                                            <li><a href="">business contact</a></li>
                                            <li><a href="">community</a></li>
                                            <li><a href="">bitwhale blog</a></li>
                                            <li><a href="">terms</a></li>
                                            <li><a href="">privacy</a></li>
                                            <li><a href="">announcments</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4 col-md-4 mb-lg-0 mb-4">
                                        <h3 className="text-capitalize footer-mb">services</h3>
                                        <ul className="footer-links">
                                            <li><a href="">download</a></li>
                                            <li><a href="">buy crypto</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-4 col-md-4 mb-lg-0 mb-1">
                                        <h3 className="text-capitalize footer-mb">support</h3>
                                        <ul className="footer-links">
                                            <li><a href="">give us feedback</a></li>
                                            <li><a href="">support center</a></li>
                                            <li><a href="">fees</a></li>
                                            <li><a href="">trading rules</a></li>
                                            <li><a href="">bitwhale blog</a></li>
                                            <li><a href="">bitwhale verify</a></li>
                                            <li><a href="">low enforcement request</a></li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <div className="container-fluid custom-box">
                    <div className="footer-bottom">
                        <p className="copyright text-center mb-0">Copyright©bitwhale 2022. All Right Reserved</p>
                    </div>
                </div>
            </div>
        </footer>
  )
}

export default Footer