import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faIdCard, faGift } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AccountCreatedInfo = () => {
  return (
    <section className="account-login">
            <div className="text-center bottom-space mb-lg-0">
                <h3 className="text-capitalize mb-lg-3">Account Created</h3>
                <p>Please proceed to complete your identity verification</p>
            </div>
            <div className="account-bg create-account">
            <div className="banner">
                <div className="container-fluid custom-box">
                    <form className="account-form form-center">
                        <div className="form-wrap">
                            <p className="form-title">You're almost there!</p>
                            <p>Next, complete identity verification from your account</p>
                        </div>
                        <div className="mb-3 user-verify">
                          <div className="user-verify-icon">
                            <FontAwesomeIcon className="fa" icon={faUserPlus} />
                          </div>
                          <div>
                              <strong className="text-capitalize form-strong">Create Account</strong>
                              <p className="mb-0 form-p">Enter your account details.</p>
                          </div>
                        </div>
                        <div className="mb-3 user-verify">
                            <div className="user-verify-icon">
                            <FontAwesomeIcon className="fa" icon={faIdCard} />
                            </div>
                            <div>
                                <strong className="text-capitalize form-strong">verift identity</strong>
                                <p className="mb-0 form-p">Verify your identity to protect your account</p>
                            </div>
                          </div>
                          <div className="mb-3 user-verify">
                            <div className="user-verify-icon">
                            <FontAwesomeIcon className="fa" icon={faGift} />
                            </div>
                            <div>
                                <strong className="text-capitalize form-strong">unlock prize</strong>
                                <p className="mb-0 form-p">Get your prize and start trading.</p>
                            </div>
                          </div>
                        <div className="d-block">
                            <Link to="/personal-info" type="submit" className="btn w-100 form-btn text-capitalize">verify now</Link>
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

export default AccountCreatedInfo