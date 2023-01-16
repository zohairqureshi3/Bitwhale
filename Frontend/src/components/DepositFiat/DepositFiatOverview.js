import React from 'react';
import {Accordion} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowRight, faBullhorn, faEuro } from '@fortawesome/free-solid-svg-icons';
import BankCardIcon from '../../assets/images/bank-card-icon.svg';
import ExpressIcon from '../../assets/images/express-icon.svg';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DepositFiatOverview = () => {
  return (
    <section className="overview currency section-padding">
            <div className="bar">
                <div className="user-screen">
                    <div className="d-flex justify-content-between align-items-center flex-md-row flex-column">
                        <div className="d-flex align-items-center mb-lg-0 mb-3">
                            <FontAwesomeIcon icon={faAngleLeft} className="fa me-lg-4 me-3 left-angle" />
                            <h3 className="mb-0">Deposit Fiat</h3>
                        </div>
                        <div className="inline-block">
                            <a type="submit" className="btn w-100 form-btn text-capitalize">Deposit Crypto
                                <FontAwesomeIcon icon={faArrowRight} className="fa ms-lg-4 ms-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mb-lg-0 mb-4">
                        <div className=" flex-column justify-content-lg-between align-items-lg-start align-items-center">
                            <p className="p2 text-capitalize">1. Select Currency</p>
                            <p className="gray p2">Currency to deposit</p>
                            <div className="select-crypto">
                                <p className="p2">Coin</p>
                                <div className="coin-dropdown">
                                    {/* <div className="dropdown mb-3">
                                        <button className="btn coin-btn w-100 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="euro me-2"><FontAwesomeIcon icon={faEuro} className='fa' /></span>
                                            <p className="p2 mb-0">EUR Euro</p>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                          <li><a className="dropdown-item" href="#">Action</a></li>
                                          <li><a className="dropdown-item" href="#">Another action</a></li>
                                          <li><a className="dropdown-item" href="#">Something else here</a></li>
                                        </ul>
                                      </div> */}
                                      <Dropdown>
                                <div className="dropdown mb-3">
                                    <Dropdown.Toggle id="dropdown-basic" className="btn coin-btn w-100 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
                                   
                                    <span className="euro me-2"><FontAwesomeIcon icon={faEuro} className='fa' /></span>
                                            <p className="p2 mb-0">EUR Euro</p>
                                        
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </div>
                                </Dropdown>




                                      <p className="p2">Pay with</p>
                                      <div className="inline-block mb-3">
                                        <a className="btn bg-white-btn text-capitalize">recommended
                                        </a>
                                        </div>
                                        <ul className="deposit-fiat-ul">
                                            <li>
                                                <div className="d-flex align-items-start">
                                                    <figure className="mb-0 me-2">
                                                        <img src={BankCardIcon} alt="" className="img-fluid" />
                                                    </figure>
                                                    <div>
                                                        <span>Bank Card(Visa/MC)</span>
                                                        <p className="p2">1.8% Fee</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex align-items-start">
                                                    <figure className="mb-0 me-2">
                                                        <img className="svg-icon" src={ExpressIcon} alt="" className="img-fluid" />
                                                    </figure>
                                                    <div>
                                                        <span>Bank Card(Visa/MC)</span>
                                                        <p className="p2">1.8% Fee</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex align-items-start">
                                                    <figure className="mb-0 me-2">
                                                        <img src={BankCardIcon} alt="" className="img-fluid" />
                                                    </figure>
                                                    <div>
                                                        <span>Bank Card(Visa/MC)</span>
                                                        <p className="p2">1.8% Fee</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="inline-block">
                                            <Link to="/deposit-fiat2" href="./deposit-fiat-2.html" className="btn form-btn text-capitalize">register now
                                            </Link>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 offset-lg-1 mb-lg-0 mb-4">
                        <p className="span-2 theme-text mb-lg-4 mb-3 text-md-start text-center">
                            <FontAwesomeIcon icon={faBullhorn} className='me-3' />
                            Didn't receive deposits?</p>
                        <div className="mb-3 d-flex flex-lg-row flex-column justify-content-lg-between align-items-center">
                            <span className="span-2 text-uppercase d-inline-block mblg-0 mb-3">faq</span>
                            <div className="inline-block">
                                <a type="submit" className="btn theme-brdr-btn">View more FAQ
                                    <FontAwesomeIcon icon={faArrowRight} className="fa ms-lg-4 ms-3" />
                                </a>
                            </div>
                        </div>
                        <div className="faq-qstns">
                            <div className="accordion accordion-flush" id="accordionFlushExample">


                                


                                <Accordion className='faq-qstns'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header ><span className='mb-0 mont-p'>How can I use Advcash to deposit?</span></Accordion.Header>
                                    <Accordion.Body>
                                    Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first item's accordion body.
                                    </Accordion.Body>
                                </Accordion.Item>
                                </Accordion>



                              </div>
                        </div>
                    </div>
                </div> 
            </div>
        </section>
  )
}

export default DepositFiatOverview