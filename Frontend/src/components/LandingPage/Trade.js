import React from 'react';
import { Container } from 'react-bootstrap';
import TrendImg from "../../assets/images/trend-img.png";
import Qrcode from "../../assets/images/qr-code.svg";
import AppleStore from "../../assets/images/apple-store.svg";
import APK from "../../assets/images/apk.svg";
import Windows from "../../assets/images/windows.svg";
import PlayStore from "../../assets/images/play-store.png";
import MacOs from "../../assets/images/mac-os.svg";
import Linux from "../../assets/images/linux.svg";

const Trade = () => {
  return (
    <section className="trade">
            <div className="trade-bg">
                <Container fluid>
                    <div className="row align-items-center">
                        <div className="col-md-8 mb-md-0 mb-3">
                            <figure className="mb-0 trade-img">
                                <img src={TrendImg} alt="" className="img-fluid" />
                            </figure>
                        </div>
                        <div className="col-md-4 mb-md-0 mb-3">
                            <div className="trade-content">
                                <div className="bottom-space">
                                    <h2 className="mb-0">Trade Anywhere anytime.</h2>
                                    <p className="p">Compatible with multiple devices, start trading with safety convenience. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-md-end justify-content-center scan-content">
                                <div>
                                    <p className="scan-text mb-1">SCAN TO DOWNLOAD</p>
                                    <strong>iOS & Android</strong>
                                </div>
                                <figure className="mb-0">
                                    <img src={Qrcode} alt="" className="img-fluid" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        <div className="device-services">
            <Container fluid>
                <div className="d-flex flex-wrap justify-content-center">
                    <a href="#" className="card mb-5 text-decoration-none">
                        <figure className="mb-0">
                            <img src={AppleStore} alt="" className="img-fluid" />
                        </figure>
                        <p className="card-title text-capitalize text-center">Apps Store</p>
                    </a>
                    <a href="#" className="card mb-5 text-decoration-none">
                        <figure className="mb-0">
                            <img src={APK} alt="" className="img-fluid" />
                        </figure>
                        <p className="card-title text-capitalize text-center">android APK</p>
                    </a>
                    <a href="#" className="card mb-5 text-decoration-none">
                        <figure className="mb-0">
                            <img src={Windows} alt="" className="img-fluid" />
                        </figure>
                        <p className="card-title text-capitalize text-center">windows</p>
                    </a>
                    <a href="#" className="card mb-5 text-decoration-none">
                        <figure className="mb-0">
                            <img src={PlayStore} alt="" className="img-fluid" />
                        </figure>
                        <p className="card-title text-capitalize text-center">google play</p>
                    </a>
                    <a href="#" className="card mb-5 text-decoration-none">
                        <figure className="mb-0">
                            <img src={MacOs} alt="" className="img-fluid" />
                        </figure>
                        <p className="card-title text-capitalize text-center">mac OS</p>
                    </a>
                    <a href="#" className="card mb-5 text-decoration-none">
                        <figure className="mb-0">
                            <img src={Linux} alt="" className="img-fluid" />
                        </figure>
                        <p className="card-title text-capitalize text-center">linux</p>
                    </a>
                    <a href="#" className="card mb-5 text-decoration-none">
                        <figure className="mb-0">
                            <img src={APK} alt="" className="img-fluid" />
                        </figure>
                        <p className="card-title text-capitalize text-center">API</p>
                    </a>
                </div>
            </Container>
        </div>
        
        </section>
  )
}

export default Trade