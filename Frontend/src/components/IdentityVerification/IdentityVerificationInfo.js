import React from 'react';
import PakistanImg from '../../assets/images/pakistan.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const IdentityVerificationInfo = () => {
  return (
    <section className="account-login">
            <div className="account-bg create-account">
            <div className="banner">
                <div className="container-fluid custom-box">
                    <form className="account-form form-center identity-form">
                        <div className="text-center">
                            <p className="text-capitalize h3 h3-mb">Identity verification</p>
                        </div>
                        <div className="info-mb">
                            <div className="mb-3">
                                <div className="country-2">
                                    <div className="dropdown">
                                        <div className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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
                            <div>
                                <strong className="text-capitalize form-strong">Use a valid government-issued document</strong>
                                <p className="form-p">Boxing shoe icon Boxing icon Shoe icon, vLinux, Opensource Software.</p>
                            </div>
                            <div className="mb-3 icon-inside">
                                <input type="text" placeholder="English(Smart card)National ID" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <span><FontAwesomeIcon icon={faIdCard} /></span>
                            </div>
                            <div className="mb-3 icon-inside">
                                <input type="text" placeholder="Passport" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <span><FontAwesomeIcon icon={faIdCard} /></span>
                            </div>
                        </div>
                        <div className="strip-bar">
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "25%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div className="inline-block">
                                <Link to="/identity-verification2" type="submit" className="btn w-100 form-btn text-capitalize">continue</Link>
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

export default IdentityVerificationInfo