import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faInfoCircle,
  faAngleRight,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DepositFiat2Info = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="overview enter-amount section-padding">
      <div className="bar">
        <div className="user-screen">
          <div className="d-flex justify-content-between align-items-center flex-md-row flex-column">
            <div className="d-flex align-items-center flex-md-row flex-column mb-lg-0 mb-3">
              <h3 className="mb-md-0 mb-3">Deposit Fiat</h3>
              <div className="inline-bllock">
                <a
                  href=""
                  className="btn-register text-capitalize ms-md-5 px-lg-4"
                >
                  order history
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="fa ms-md-4 ms-3"
                  />
                </a>
              </div>
            </div>
            <div className="inline-block">
              <a type="submit" className="btn w-100 form-btn text-capitalize">
                Deposit Crypto
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="fa ms-md-4 ms-3"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 mb-lg-0 mb-4">
            <div className="flex-column justify-content-lg-between align-items-lg-start align-items-center">
              <p className="p2 text-capitalize mb-3">2. Enter amount</p>
              <div className="select-crypto">
                <div className="d-flex justify-content-between align-items-center flex-md-row flex-column mb-3">
                  <p className="p2 mb-lg-0 mb-3">Amount</p>
                  <div className="d-flex align-items-center">
                    <p className="p2 mb-0">Transection requirements</p>
                    <FontAwesomeIcon icon={faInfoCircle} className="fa ms-3" />
                  </div>
                </div>
                <div className="coin-dropdown coin-form-main">
                  <div className="coin-form-wrap">
                    <div className="coin-input">
                      <form>
                        <div className="mb-3 position-relative">
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter 15-43790"
                          />
                          <span className="text-uppercase coin-span">EUR</span>
                        </div>
                      </form>
                    </div>
                    <p className="text-capitalize p2">You Receive:</p>
                    <span className="text-uppercase mb-3 d-inline-block">
                      0.00EUR
                    </span>
                    <div className="d-flex align-items-center mb-3">
                      <p className="text-capitalize mb-0 p2">You Receive:</p>
                      <div
                        onClick={handleShow}
                        className="outline-button ms-lg-5 ms-3"
                      >
                        <a
                          className="outline-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalfour"
                        >
                          Add new card
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="fa ms-lg-3 ms-3"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <p className="text-capitalize mb-0 p2">
                        Transection Fee:
                      </p>
                      <p className="ms-lg-5 p2 mb-0 ms-3">0.00EUR</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-lg-start justify-content-center">
                    <div className="inline-block">
                      <a className="btn bg-white-btn text-capitalize">
                        previous
                      </a>
                    </div>
                    <div className="inline-block">
                      <Link
                        to="/overview"
                        className="btn form-btn text-capitalize ms-3 ms-3"
                      >
                        continue
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1 mb-lg-0 mb-4">
            <div className="deposit-text">
              <p className="span-2 theme-text mb-lg-4 mb-3">
                <FontAwesomeIcon icon={faBullhorn} className="fa me-3" />
                Didn't receive deposits?
              </p>
              <div className="mb-3">
                <span className="span-2 text-uppercase d-inline-block mb-3">
                  Notice
                </span>
                <p>
                  If your deposit failed and your funds have been deducted, the
                  money will be refunded within 7-10 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal className="modal-wrapper" show={show} onHide={handleClose}>
        <Modal.Header className="modal-main-heading" closeButton>
          <div className="modal-main-heading-content">
            <h3 className="modal-title" id="exampleModalLabel">
              Add New Card
            </h3>
            <p className="gray p2">Enter card information.</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="modal-four-input-wrapper mb-3">
              <label htmlFor="exampleInputname" className="form-label">
                Name
              </label>
              <input
                type="search"
                className="form-control"
                id="exampleInputname"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="modal-four-input-wrapper mb-3 card-deposit">
              <label htmlFor="exampleInputcard" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputcard"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="modal-four-input-area d-flex justify-content-between card-de">
              <div className="modal-four-input-wrapper mb-3 card-deposit date-code">
                <label htmlFor="exampleInputdate" className="form-label">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleInputdate"
                  aria-describedby="emailHelp"
                  placeholder="MM/YY"
                />
              </div>
              <div className="modal-four-input-wrapper mb-3 card-deposit date-code">
                <label htmlFor="exampleInputcode" className="form-label">
                  Security Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputcode"
                  aria-describedby="emailHelp"
                  placeholder="CVV"
                />
              </div>
            </div>
            <div className="inline-block text-center">
              <a href="#" className="btn form-btn text-capitalize ms-3 ms-3">
                next
              </a>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default DepositFiat2Info;
