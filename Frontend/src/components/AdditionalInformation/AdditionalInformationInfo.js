import React from 'react'
import { Link } from 'react-router-dom'

const AdditionalInformationInfo = () => {
  return (
    <section className="account-login">
            <div className="account-bg create-account">
            <div className="banner">
                <div className="container-fluid custom-box">
                    <form className="account-form form-center">
                        <div className="text-center">
                            <p className="text-capitalize h3 h3-mb">additional information</p>
                        </div>
                        <div className="info-mb">
                            <div className="mb-3">
                                <input type="text" placeholder="Enter residential address" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="input-wrap">
                                <div className="mb-3">
                                    <input type="text" placeholder="Postal Code" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                <input type="text" placeholder="City" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                            </div>
                        </div>
                        <div className="strip-bar">
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "25%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div className="inline-block">
                                <Link to="/identity-verification" type="submit" className="btn w-100 form-btn text-capitalize">continue</Link>
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

export default AdditionalInformationInfo