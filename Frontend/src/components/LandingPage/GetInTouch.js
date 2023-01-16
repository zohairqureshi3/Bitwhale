import React from 'react';
import { Container } from 'react-bootstrap';
import Aqua from '../../assets/images/aqua-circle-group.svg';
import { Link } from 'react-router-dom';

const GetInTouch = () => {

    const token = localStorage.getItem('uToken');

    return (
        <section className="getting-in-touch">
            <div className="text-center bottom-space">
                <h2 className="text-capitalize mb-0">get in touch</h2>
            </div>
            <div className="get-in-touch-bg">
                <div className="get-in-touch">
                    <Container fluid className="custom-box">
                        <div className="aqua-circle">
                            <figure className="mb-0">
                                <img src={Aqua} alt="" className="img-fluid" />
                            </figure>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-3 col-md-6 mb-lg-0 mb-3">
                                <div className="card text-center">
                                    <figure className="mb-0">

                                        <lottie-player className="mx-auto " src="https://assets10.lottiefiles.com/packages/lf20_gtabsw3c.json" background="transparent" speed="1" style={{ width: "140px", height: "140px" }} loop autoplay>
                                        </lottie-player>
                                    </figure>
                                    <p className="card-title text-capitalize">24 / 7 Support</p>
                                    <p>Got a problem? Just get in touch. Our support team is available 27/7.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-lg-0 mb-3">
                                <div className="card text-center">
                                    <figure className="mb-0">

                                        <lottie-player className="mx-auto " src="https://assets8.lottiefiles.com/packages/lf20_1bnafi6e.json" background="transparent" speed="1" style={{ width: "140px", height: "140px" }} loop autoplay>
                                        </lottie-player>
                                    </figure>
                                    <p className="card-title text-capitalize">Bitwhale Blog</p>
                                    <p>News and update from the world's leading cryptocurrency exchange.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-lg-0 mb-3">
                                <div className="card text-center">
                                    <figure className="mb-0">

                                        <lottie-player className="mx-auto " src="https://assets3.lottiefiles.com/packages/lf20_lzh1v4mv.json" background="transparent" speed="1" style={{ width: "140px", height: "140px" }} loop autoplay>
                                        </lottie-player>
                                    </figure>
                                    <p className="card-title text-capitalize">Community</p>
                                    <p>Bitwhale is global. Join the discussion in our worldwide communities.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-lg-0 mb-3">
                                <div className="card text-center">
                                    <figure className="mb-0">

                                        <lottie-player className="mx-auto " src="https://assets9.lottiefiles.com/packages/lf20_jnrq06bl.json" background="transparent" speed="1" style={{ width: "140px", height: "140px" }} loop autoplay>
                                        </lottie-player>
                                    </figure>
                                    <p className="card-title text-capitalize">careers</p>
                                    <p>Help build the furture of technology. Start your new career at Bitwhale.</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center bottom-space trading">
                            <h2 className="text-capitalize mb-0">start trading now</h2>
                        </div>
                        <div>
                            <div className="text-center d-flex justify-content-center">
                                {token ? "" :
                                    <Link to="/register" className="btn-register text-capitalize">register now</Link>
                                }
                                <Link to="/market" className="btn-register text-capitalize ms-1">trade now</Link>
                            </div>
                        </div>
                    </Container>
                </div>

            </div>


        </section>
    )
}

export default GetInTouch