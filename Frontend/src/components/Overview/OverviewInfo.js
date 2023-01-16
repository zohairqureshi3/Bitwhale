import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from '../SideBar/SideBar';
import ETH from '../../assets/images/ETH.png';
import CNF from '../../assets/images/CoinNotFound.png';
import XRP from '../../assets/images/XRP.png';
import USDT from '../../assets/images/USDT.png';
import BTC from '../../assets/images/BTC.png';
import { useDispatch, useSelector } from "react-redux";
import { getDeposits } from '../../redux/externalTransactions/externalTransactionActions';
import { getCurrency } from '../../redux/currencies/currencyActions';
import axios from "axios";
import GetAccountData from "../shared/GetAccountData";

const OverviewInfo = () => {

  const [exchangeRates, setExchangeRates] = useState([]);
  const [problem, setProblem] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.user?._id);
  const currencyData = useSelector((state) => state.currency?.currencies?.allCurrencies);
  // const AccountData = useSelector((state) => state.accounts.account);
  const amounts = useSelector((state) => state.accounts?.account?.amounts);
  const deposits = useSelector((state) => state.externalTransactions?.deposits?.deposits);

  useEffect(() => {
    axios.get(`https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=ETH,XRP,BTC&api_key=6f8e04fc1a0c524747940ce7332edd14bfbacac3ef0d10c5c9dcbe34c8ef9913`)
      .then((res) => {
        console.log(res.data)
        setExchangeRates(res.data)
      })
      .catch((error) => {
        setProblem(true)
      });
  }, [])

  useEffect(() => {
    if (!exchangeRates) {
      axios.get(`https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=ETH,XRP,BTC&api_key=6f8e04fc1a0c524747940ce7332edd14bfbacac3ef0d10c5c9dcbe34c8ef9913`)
        .then((res) => {
          console.log(res.data)
          setExchangeRates(res.data)
        })
        .catch((error) => {
          setProblem(true)
        });
    }
    dispatch(getCurrency());
    if (userId) {
      dispatch(getDeposits(userId))
    }
  }, [userId])


  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }

  const formatDate = (date) => {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

  const getCoinImg = (name) => {
    if (name == 'ETH')
      return ETH
    if (name == 'BTC')
      return BTC
    if (name == 'XRP')
      return XRP
    if (name == 'USDT')
      return USDT
    return CNF
  }

  return (
    <section className="overview section-padding transection-history-section">
      <GetAccountData />
      <div className="row">

        <SideBar />

        <div className="col-lg-10 mb-lg-0 mb-3 canvas fade-color">
          <div className="container-fluid custom-box user-screen">
            <div className="d-flex justify-content-between align-items-center flex-md-row flex-column user-screen-mb">
              <h3 className="text-capitalize">overview</h3>
              <div className="custom-tabs">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <Link to="/deposit">Deposit</Link>

                    </button>
                    <button
                      className="nav-link"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <Link to="/withdraw-crypto">Withdraw</Link>
                    </button>
                    {/* <button
                      className="nav-link"
                      id="nav-contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-contact"
                      type="button"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      send
                    </button> */}
                    <button
                      className="nav-link"
                      id="nav-contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-contact"
                      type="button"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      <Link to="/convert">Convert</Link>
                    </button>
                    <button
                      className="nav-link"
                      id="nav-contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-contact"
                      type="button"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      {" "}
                      <Link to="/transaction-history">
                        transaction history
                      </Link>{" "}
                    </button>
                  </div>
                </nav>
                {/* <!-- <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
                                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
                              </div> --> */}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 mb-lg-0 mb-5">
                <div className="wrap-balance">
                  <h3 className="text-capitalize mb-3 d-block">
                    Estimated balance
                  </h3>
                  {!problem ?
                    amounts && amounts.length ?
                      amounts.map((coin, index) =>
                        <>
                          {currencyData?.find(row => row._id == coin.currencyId)?.name ?
                            <div className="d-flex blnc-div align-items-center" key={index}>
                              <strong className="mb-0">
                                <div style={{ width: "40px", height: "40px" }} className="currency-info-logo-popup d-inline-block me-1">
                                  <img src={getCoinImg(currencyData?.find(row => row._id == coin.currencyId)?.symbol)} alt="" className="img-fluid" />
                                </div>
                                {currencyData?.find(row => row._id == coin.currencyId)?.symbol}
                                {"  "}{coin.amount}
                              </strong>
                              <span>=</span>
                              {currencyData?.find(row => row._id == coin.currencyId)?.symbol != 'USDT' ?
                                <strong>
                                  $ {(coin.amount * (1 / exchangeRates[currencyData?.find(row => row._id == coin.currencyId)?.symbol])).toPrecision(12)}
                                </strong>
                                :
                                <strong>
                                  $ {coin.amount}
                                </strong>
                              }
                            </div>
                            : null
                          }
                        </>
                      )
                      :
                      "Empty Wallet"
                    : "There was a Problem Fetching the conversion amounts. Please try again another time"
                  }
                </div>
                {/* <div className="custom-blnc-div">
                  <div className="d-flex justify-content-between">
                    <span className="text-capitalize mb-3 d-block">
                      my assets
                    </span>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Hide 0 Balance Wallets
                      </label>
                    </div>
                  </div>
                  <ul className="blnc-ul">
                    <li>
                      <div className="d-flex justify-content-between align-items-center border-tr">
                        <span className="text-capitalize d-block">
                          Fiat and Spot
                        </span>
                        <div className="d-flex table-blnc-div align-items-center">
                          <h3 className=".h3 mb-0">0.00001103BTC</h3>
                          <span>=</span> <strong>$141326.40</strong>
                          <a href="#">
                            <FontAwesomeIcon icon={faAngleRight} />
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex justify-content-between align-items-center border-tr">
                        <span className="text-capitalize d-block">
                          Fiat and Spot
                        </span>
                        <div className="d-flex table-blnc-div align-items-center">
                          <h3 className=".h3 mb-0">0.00001103BTC</h3>
                          <span>=</span> <strong>$141326.40</strong>
                          <a href="#">
                            <FontAwesomeIcon icon={faAngleRight} />
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex justify-content-between align-items-center border-tr">
                        <span className="text-capitalize d-block">
                          Fiat and Spot
                        </span>
                        <div className="d-flex table-blnc-div align-items-center">
                          <h3 className=".h3 mb-0">0.00001103BTC</h3>
                          <span>=</span> <strong>$141326.40</strong>
                          <a href="#">
                            <FontAwesomeIcon icon={faAngleRight} />
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="col-lg-4 mb-lg-0 mb-5">
                <div className="bottom-space d-flex justify-content-lg-between align-items-center recent-transaction-view-all">
                  <h3 className="mb-0 text-capitalize">Recent Deposits</h3>
                  <div className="d-block">
                    <Link to="/transaction-history" className="view-btn text-capitalize">
                      view all
                    </Link>
                  </div>
                </div>
                <ul className="recent">
                  {deposits && deposits.length ?
                    deposits.slice(0, 4).map((deposit, index) =>
                      <li>
                        <div className="d-flex w-100 justify-content-between" key={index}>
                          <div className="d-flex align-items-center">
                            {/* <a href="" className="square-bg text-decoration-none">
                          <FontAwesomeIcon icon={faDownload} />
                        </a> */}
                            <div>
                              <span className="before-plus text-uppercase">
                                {deposit.amount} {deposit.currency}
                              </span>
                              <div className="date-time-group">
                                <span>{formatDate(new Date(deposit.createdAt))}</span>
                              </div>
                            </div>
                          </div>
                          <div className="total-usd d-flex flex-column">
                            {deposit.isResolved ?
                              <span className="before-dot-green text-capitalize">
                                Completed
                              </span>
                              :
                              <span className="before-dot-yellow text-capitalize">
                                Pending
                              </span>
                            }
                          </div>
                        </div>
                      </li>
                    )
                    :
                    <li>
                      No Deposits found
                    </li>
                  }

                </ul>
                {/* <span className="mb-1 d-block">Deposit haven’t arrived?</span>
                <div className="d-block">
                  <a href="" className="white-btn">
                    Click here
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default OverviewInfo;
