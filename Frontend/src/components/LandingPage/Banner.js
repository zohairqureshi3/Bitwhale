import React from 'react';
import { Image, Container } from 'react-bootstrap';
import Crypto from '../../assets/images/crypto-bg.svg';
import { Link } from 'react-router-dom';

const Banner = () => {

    const token = localStorage.getItem('uToken');

    return (
        <section className="banner-bg">
            <div className="banner">
                <Container fluid className="custom-box">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 mb-md-0 mb-3">
                            <figure className="banner-img mb-0">
                                <Image src={Crypto} alt="Buy & Sell Crypto" fluid />
                                <div className="lottifile">
                                    <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_mjiiuod3.json" background="transparent" speed="1" loop autoplay>
                                    </lottie-player>
                                </div>
                            </figure>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-md-0 mb-3">
                            <div className="wrap-text">
                                <h1 className="text-capitalize">buy & sell crypto</h1>
                                <strong className="banner-strong text-capitalize">in minutes<span className="dot">.</span></strong>
                                <p className="dot">Join the world's largest crypto exchange.</p>
                            </div>
                            <Link to="/futures" className="btn-register text-capitalize me-2">Futures</Link>
                            {token ? "" :
                                <Link to="/register" className="btn-register text-capitalize">register</Link>
                            }
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default Banner