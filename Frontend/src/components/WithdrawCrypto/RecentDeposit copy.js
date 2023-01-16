import React, { useState } from 'react';
import Binance from '../../assets/images/binance.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faBars, faAngleRight, faLink, faClone } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';

const RecentDeposit = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <section className="recent-deposit">
            <div className="container-fluid user-screen">
                <div className="d-flex flex-md-row flex-column justify-content-md-between mb-40 align-items-center">
                    <div className="d-flex align-items-center mb-md-0 mb-3">
                        <h3 className="text-capitalize mb-0">Recent Withdrawals</h3>
                        <div className="btn-group ms-5 bar-btn-group " role="group" aria-label="Basic mixed styles example">
                            <button type="button" className="btn btn-bar">
                                <FontAwesomeIcon icon={faTh} />
                            </button>
                            <div className="line"></div>
                            <button type="button" className="btn btn-bar">
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        </div>
                    </div>
                    {/* <div className="d-flex">
                        <div className="inline-block">
                            <a href="" className="btn light-btn">Why has my withdrawal not arrived?</a>
                        </div>
                        <div className="form-check red-checkbox ms-lg-4 ms-3">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Default checkbox
                            </label>
                        </div>
                    </div> */}
                </div>
                <div className="deposit-data">
                    <div className="wrap-deposit wrap-withdraw" onClick={handleShow}>
                        <div className="deposit-cmplt mb-30 justify-content-between">
                            <div className="deposit-img d-flex align-items-center">
                                <figure className="mb-0">
                                    <img src={Binance} alt="Deposits" className="img-fluid" />
                                </figure>
                                <span className="ms-2 text-capitalize">4000 USDT</span>
                            </div>
                            <div className="inline-block">
                                <a href="" className="btn green-btn rounded-pill text-capitalize">completed</a>
                            </div>
                        </div>
                        <div className="deposit-info withdraw-info">
                            <div className="row">
                                <div className="col-lg-11">
                                    <ul>
                                        <li><div className="d-flex align-items-center"><p className="p2 mb-0">2022-02-02</p><p className="p2 mb-0 ms-2">19:36</p></div></li>
                                        <li><div className="d-flex align-items-center"><p className="p2 mb-0 gray text-capitalize">Network</p><p className="p2 mb-0 ms-2 text-uppercase">bsc</p></div></li>
                                        <li><div className="d-flex align-items-center"><p className="p2 mb-0 gray text-capitalize">Address</p><p className="p2 mb-0 ms-2 d-flex align-items-center">0xacd26bc24aae55be583e4903ac4e0f2f1d434466
                                            <div className="ms-lg-4 ms-3">
                                                <FontAwesomeIcon icon={faLink} className='ms-2' />
                                                <FontAwesomeIcon icon={faClone} className='ms-3' />
                                            </div>
                                        </p></div></li>
                                        <li><div className="d-flex align-items-center"><p className="p2 mb-0 gray text-capitalize">Deposit Wallet</p><p className="p2 mb-0 ms-2 text-capitalize d-flex align-items-center">Spot Wallet
                                        </p></div></li>
                                        <li>
                                            <div className="d-flex align-items-center">
                                                <p className="p2 mb-0 gray">TxID</p>
                                                <p className="p2 mb-0 ms-2">96408702002 </p>
                                                <p className="p2 mb-0 gray ms-1">Internal</p>
                                                <div className="ms-lg-4 ms-3">
                                                    <FontAwesomeIcon icon={faLink} className='ms-2' />
                                                    <FontAwesomeIcon icon={faClone} className='ms-3' />
                                                </div>
                                            </div></li>
                                    </ul>
                                </div>
                                <div className="col-lg-1">
                                    <a href="" className="right-arrow-circle  ms-lg-5 ms-3">
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="wrap-deposit wrap-withdraw" onClick={handleShow}>
                        <div className="deposit-cmplt mb-30 justify-content-between">
                            <div className="deposit-img d-flex align-items-center">
                                <figure className="mb-0">
                                    <img src={Binance} alt="Deposits" className="img-fluid" />
                                </figure>
                                <span className="ms-2 text-capitalize">4000 USDT</span>
                            </div>
                            <div className="inline-block">
                                <a href="" className="btn green-btn rounded-pill text-capitalize">completed</a>
                            </div>
                        </div>
                        <div className="deposit-info withdraw-info">
                            <div className="row">
                                <div className="col-lg-11">
                                    <ul>
                                        <li><div className="d-flex align-items-center"><p className="p2 mb-0">2022-02-02</p><p className="p2 mb-0 ms-2">19:36</p></div></li>
                                        <li><div className="d-flex align-items-center"><p className="p2 mb-0 gray text-capitalize">Network</p><p className="p2 mb-0 ms-2 text-uppercase">bsc</p></div></li>
                                        <li><div className="d-flex align-items-center"><p className="p2 mb-0 gray text-capitalize">Address</p><p className="p2 mb-0 ms-2 d-flex align-items-center">0xacd26bc24aae55be583e4903ac4e0f2f1d434466
                                            <div className="ms-lg-4 ms-3">
                                                <FontAwesomeIcon icon={faLink} className='ms-2' />
                                                <FontAwesomeIcon icon={faClone} className='ms-3' />
                                            </div>
                                        </p></div></li>
                                        <li><div className="d-flex align-items-center"><p className="p2 mb-0 gray text-capitalize">Deposit Wallet</p><p className="p2 mb-0 ms-2 text-capitalize d-flex align-items-center">Spot Wallet
                                        </p></div></li>
                                        <li><div className="d-flex align-items-center">
                                            <p className="p2 mb-0 gray">TxID</p>
                                            <p className="p2 mb-0 ms-2">96408702002 </p><p className="p2 mb-0 gray ms-1">Internal</p>
                                            <div className="ms-lg-4 ms-3">
                                                <FontAwesomeIcon icon={faLink} className='ms-2' />
                                                <FontAwesomeIcon icon={faClone} className='ms-3' />
                                            </div>
                                        </div></li>
                                    </ul>
                                </div>
                                <div className="col-lg-1">
                                    <a href="" className="right-arrow-circle  ms-lg-5 ms-3">
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <Modal className="modal-wrapper modal-six-wrapper withdraw-crypo-modal" show={show} onHide={handleClose}>
                <Modal.Header className='modal-main-heading' closeButton>
                    <div className="modal-main-heading-content">
                        <h3 className="modal-title" id="exampleModalLabel">Withdrawal Details</h3>
                        <span className="header-border"></span>
                    </div>
                </Modal.Header>


                <Modal.Body>
                    <div className="withdrawal-content-area">
                        <div className="withdrawal-content border-pink">
                            <span className="text-dark">Withdrawal order submitted</span>
                            <p className="p2">2022-01-17 10:24</p>
                        </div>
                        <div className="withdrawal-content border-green">
                            <span className="text-dark">System Processing</span>
                            <p className="p2">2022-01-17 10:26</p>
                        </div>
                        <div className="withdrawal-content border-blue">
                            <span className="text-dark">Completed</span>
                            <p className="mb-0 p2">2022-01-17 10:24</p>
                            <p>Please note that you will receive a email once it is completed.</p>
                        </div>
                    </div>
                    <div className="modal-six-bottom-area">
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Status</p>
                            </div>
                            <div className="deposit-details-content-info details-dot d-flex align-items-center">
                                <span className="m-0 text-dark"> Completed</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Date</p>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <span className="m-0 text-dark"> 2022-01-17 10:24</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <span className="m-0 p2">Withdraw wallet</span>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <span className="m-0 text-dark"> Spot Wallet</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Coin</p>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <figure className="deposit-logo mb-0">
                                    <img src={Binance} className="img-fluid" />
                                </figure>
                                <span className="m-0 text-dark"> BNB</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Withdraw amount</p>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <span className="m-0 text-dark"> 0.9995</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Network fee</p>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <span className="m-0 text-dark"> 0.0005</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Network</p>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <span className="m-0 text-dark"> BSC</span>
                            </div>
                        </div>
                    </div>

                </Modal.Body>



            </Modal>

        </section>
    )
}

export default RecentDeposit