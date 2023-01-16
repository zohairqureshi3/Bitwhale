import React from 'react';
import { Link } from 'react-router-dom';
import PakistanImg from '../../assets/images/pakistan.png';


const PersonalInfo = () => {
    return (
        <section className="account-login">
            <div className="account-bg create-account">
                <div className="banner">
                    <div className="container-fluid custom-box">
                        <form className="account-form form-center">
                            <div className="text-center">
                                <p className="text-capitalize h3 h3-mb">personal information</p>
                            </div>
                            <div className="info-mb">
                                <div className="input-wrap">
                                    <div className="mb-3">
                                        <input type="text" placeholder="First Name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" placeholder="Last Nmae" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                </div>
                                <div className="input-wrap">
                                    <div className="mb-3">
                                        <input type="text" placeholder="Mobile Name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" placeholder="Date of Birth" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="country-2">
                                        <div className="dropdown">
                                            <div className="btn dropdown-toggle" type="button">
                                                <figure className="mb-0">
                                                    <img src={PakistanImg} alt="select country" className="img-fluid" />
                                                </figure>
                                                <span className="code">(+92)</span>
                                            </div>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li className="dropdown-item">
                                                    <div className="country-code-wrap">
                                                        <figure className="mb-0">
                                                            <img src={PakistanImg} alt="select country" className="img-fluid" />
                                                        </figure>
                                                        <span className="code">(+92)</span>
                                                    </div>
                                                </li>
                                                <li className="dropdown-item">
                                                    <div className="country-code-wrap">
                                                        <figure className="mb-0">
                                                            <img src={PakistanImg} alt="select country" className="img-fluid" />
                                                        </figure>
                                                        <span className="code">(+92)</span>
                                                    </div>
                                                </li>
                                                <li className="dropdown-item">
                                                    <div className="country-code-wrap">
                                                        <figure className="mb-0">
                                                            <img src={PakistanImg} alt="select country" className="img-fluid" />
                                                        </figure>
                                                        <span className="code">(+92)</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="strip-bar">
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "25%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="inline-block">
                                    <Link to="/additional-info" type="submit" className="btn w-100 form-btn text-capitalize">continue</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <footer>
                <div className="container-fluid custom-box">
                    <div className="footer-bottom">
                        <p className="copyright text-center mb-0">©2022 Bitwhale.com</p>
                    </div>
                </div>
            </footer>
        </section>
    )
}

export default PersonalInfo