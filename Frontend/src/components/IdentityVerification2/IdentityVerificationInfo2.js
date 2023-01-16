import React from 'react';
import IdCard from '../../assets/images/id-card.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCheck, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const IdentityVerificationInfo2 = () => {
    return (
        <section className="account-login ">
            <div className="account-bg create-account">
                <div className="banner identity-vh vh-100">
                    <div className="container-fluid custom-box">
                        <form className="account-form form-center identity-form2">
                            <div className="text-center">
                                <p className="text-capitalize h3 h3-mb">Identity verification</p>
                            </div>
                            <div className="info-mb mb-0">
                                <div>
                                    <strong className="text-capitalize form-strong">Take a Photo of ID Card</strong>
                                    <ul className="icon-card-li">
                                        <li>
                                            <div className="icon-card">
                                                <figure className="mb-0">
                                                    <img src={IdCard} alt="" className="img-fluid" />
                                                </figure>
                                                <span className="check-circle"><FontAwesomeIcon icon={faCheck} /></span>
                                            </div>
                                            <p className="iocn-title text-center">Good</p>
                                        </li>
                                        <li>
                                            <div className="icon-card">
                                                <figure className="mb-0">
                                                    <img src={IdCard} alt="" className="img-fluid" />
                                                </figure>
                                                <span className="check-red-circle"><FontAwesomeIcon icon={faClose} /></span>
                                            </div>
                                            <p className="iocn-title text-center">Not cropped</p>
                                        </li>
                                        <li>
                                            <div className="icon-card">
                                                <figure className="mb-0">
                                                    <img src={IdCard} alt="" className="img-fluid" />
                                                </figure>
                                                <span className="check-red-circle"><FontAwesomeIcon icon={faClose} /></span>
                                            </div>
                                            <p className="iocn-title text-center">Not blur</p>
                                        </li>
                                        <li>
                                            <div className="icon-card">
                                                <figure className="mb-0">
                                                    <img src={IdCard} alt="" className="img-fluid" />
                                                    <span className="check-red-circle"><FontAwesomeIcon icon={faClose} /></span>
                                                </figure>
                                            </div>
                                            <p className="iocn-title text-center">Not reflective</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="before-check mb-3">
                                    <ul>
                                        <li className="tick"><p className="mb-0"><span><FontAwesomeIcon className='fa lht-green' icon={faCheck} /></span> Government-issued</p></li>
                                        <li className="tick"><p className="mb-0"><span><FontAwesomeIcon className='fa lht-green' icon={faCheck} /></span> Original full size, unedited document</p></li>
                                        <li className="tick"><p className="mb-0"><span><FontAwesomeIcon className='fa lht-green' icon={faCheck} /></span> Place documents against a single-coloured background</p></li>
                                        <li className="tick"><p className="mb-0"><span><FontAwesomeIcon className='fa lht-green' icon={faCheck} /></span> Readable, well-lit, coloured images</p></li>
                                        <li className="cross"><p className="mb-0"><span><FontAwesomeIcon className='fa lht-red' icon={faClose} /></span> No black and white images</p></li>
                                        <li className="cross"><p className="mb-0"><span><FontAwesomeIcon className='fa lht-red' icon={faClose} /></span> No Edited or expired document</p></li>
                                    </ul>
                                </div>
                                <p className="iocn-title">File size must be between 10kb - 5120kb .jpg/.jpeg/ .png format.</p>
                                <div className="upload-form">
                                    <div className="mb-3 upload-form-input w-100">
                                        <label htmlFor="file-upload" className="custom-file-upload">

                                            <FontAwesomeIcon className='fa d-block text-center mb-2 m-auto' icon={faCamera} />
                                            Front of Document
                                        </label>
                                    </div>
                                    <div className="mb-3 upload-form-input w-100">
                                        <label htmlFor="file-upload" className="custom-file-upload">
                                            <FontAwesomeIcon className='fa d-block text-center mb-2 m-auto' icon={faCamera} />
                                            Front of Document
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="strip-bar">
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "100%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="inline-block">
                                    <Link to="/login" type="submit" className="btn w-100 form-btn text-capitalize">continue</Link>
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

export default IdentityVerificationInfo2