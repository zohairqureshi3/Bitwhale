import React, { useEffect, useState } from 'react';
import { Dropdown, Button, Modal } from 'react-bootstrap';
import Bitcoin from '../../assets/images/bitcoin.png';
import WhiteIcon from '../../assets/images/white-listed-icon.svg';
import PayIcon from '../../assets/images/pay-icon.svg';
import IIcon from '../../assets/images/i-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faPlay, faFile, faArrowRight, faInfoCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCurrency } from '../../redux/currencies/currencyActions';
import { getUserWallet, createUserWallet } from '../../redux/wallet/walletActions';
import { getNetwork } from '../../redux/networks/networkActions';

const ReceiveAmountInfo = () => {
    const [show, setShow] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState([]);
    const [selectedNetwork, setSelectedNetwork] = useState([]);
    const [withdrawTo, setWithdrawTo] = useState(1); // 1: Address book , 2: New address
    const [amount, setAmount] = useState(0); // 1: Address book , 2: New address
    const [showWallet, setShowWallet] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const currencyData = useSelector((state) => state.currency?.currencies?.allCurrencies);
    const networks = useSelector((state) => state.networks?.networks);
    const userId = useSelector((state) => state.user?.user?._id);
    const wallet = useSelector((state) => state.wallet?.wallet);

    useEffect(() => {
        dispatch(getCurrency());
        dispatch(getNetwork());
    }, []);

    const getWalletInfo = (network) => {
        dispatch(getUserWallet(userId, network._id));
    }

    const createWallet = () => {
        dispatch(createUserWallet(userId, selectedNetwork._id));
    }

    return (
        <section className="overview">
            <div className="bar">
                <div className="user-screen">
                    <div className="d-flex justify-content-between align-items-center flex-md-row flex-column">
                        <div className="d-flex align-items-center mb-lg-0 mb-3">
                            <FontAwesomeIcon icon={faAngleLeft} className="me-lg-4" />
                            <h3 className="mb-0">Withdraw Crypto</h3>
                        </div>
                        {/* <div className="inline-block">
                            <a type="submit" className="btn w-100 form-btn text-capitalize">Withdraw Fiat</a>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="container-fluid user-screen">
                <div className="row">
                    <div className="col-lg-7 mb-lg-0 mb-4">
                        <div className="wrap-coin-box mb-3 d-flex flex-lg-row flex-column align-items-lg-start align-items-center">
                            <p className="p2 text-capitalize coin-box-space">Select Coin</p>
                            <div className="select-crypto w-100">
                                <p className="p2">Coin</p>
                                <Dropdown className="coin-dropdown">
                                    <div className="dropdown mb-3">
                                        <Dropdown.Toggle className="btn coin-btn w-100 dropdown-toggle" type="button" >
                                            {selectedCurrency && selectedCurrency.symbol ?
                                                <>
                                                    <figure className="mb-0 toggle-img">
                                                        <img src={require(`../../assets/images/${selectedCurrency.symbol}.png`).default} alt="" className="img-fluid" />
                                                    </figure>
                                                    <p className="p2 mb-0">{selectedCurrency.symbol} <p className="gray mb-0 ms-1">{selectedCurrency.name}</p></p>
                                                </>
                                                :
                                                "Select Coin"
                                            }
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {currencyData && currencyData.length > 0 && currencyData.map((currency) => (
                                                <Dropdown.Item onClick={() => { setSelectedCurrency(currency); setSelectedNetwork([]); }}>{currency.name}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                        {selectedCurrency && selectedCurrency._id ?
                            <>
                                <div className="wrap-coin-box d-flex flex-lg-row flex-column align-items-lg-start align-items-center mb-50">
                                    <p className="p2 text-capitalize coin-box-space">Withdraw to</p>
                                    <div className="select-crypto w-100">
                                        <div className="d-flex justify-content-between align-items-center flex-md-row flex-column mb-50">
                                            <div className="d-flex align-items-center justify-content-lg-start justify-content-center mb-3">
                                                <div className="inline-block">
                                                    <a className={withdrawTo == 1 ? "bg-white-btn" : "bg-gray" + " btn text-capitalize"} onClick={() => setWithdrawTo(1)}>address book
                                                    </a>
                                                </div>
                                                {/* <div className="inline-block">
                                                    <a className={withdrawTo == 2 ? "bg-white-btn" : "bg-gray" + " btn text-capitalize ms-3 ms-3"} onClick={() => setWithdrawTo(2)}>new address
                                                    </a>
                                                </div> */}
                                            </div>
                                            {/* <span className="dot text-capitalize">Address Management</span> */}
                                        </div>
                                        <div className="select-crypto w-100">
                                            <p className="p2 text-capitalize">address book</p>
                                            <Dropdown className="coin-dropdown">
                                                <div className="dropdown mb-3">
                                                    <Dropdown.Toggle className="btn coin-btn w-100 dropdown-toggle" type="button">
                                                        {selectedNetwork && selectedNetwork.name ?
                                                            <>
                                                                <figure className="mb-0 toggle-img">
                                                                    <img src={require(`../../assets/images/${selectedNetwork.symbol}.png`).default} alt="" className="img-fluid" />
                                                                </figure>
                                                                <p className="p2 mb-0"> {selectedNetwork.symbol} <p className="gray mb-0 ms-1">{selectedNetwork.name}</p></p>
                                                            </>
                                                            :
                                                            "Select Network"
                                                        }
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        {networks && networks.length > 0 && networks.filter(network => network.currencies.some((o) => o._id === selectedCurrency._id)).map((network) => (
                                                            <Dropdown.Item onClick={() => { getWalletInfo(network); setSelectedNetwork(network) }}>{network.name}</Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </div>
                                            </Dropdown>

                                            {selectedNetwork && selectedNetwork.name ?
                                                wallet && wallet.address ?
                                                    <div className="address-li mt-5">
                                                        <ul>
                                                            <li>
                                                                <p className="p2 mb-0">Address</p> <span className="ms-lg-5 ms-3">{wallet.address}</span>
                                                            </li>
                                                            <li>
                                                                <p className="p2 mb-0">Network</p> <span className="ms-lg-5 ms-3 text-capitalize">{selectedNetwork.name}</span>
                                                            </li>
                                                            <li>
                                                                <p className="p2 mb-0">Network</p>
                                                                <a href="" className="icon-btn d-flex ms-lg-5 ms-3">
                                                                    <figure className="mb-0">
                                                                        <img src={WhiteIcon} alt="" className="img-fluid me-2" />
                                                                    </figure>
                                                                    Whitelisted</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    :
                                                    <div className="inline-block">
                                                        {/* <p> Wallet not found </p> */}
                                                        <a onClick={() => createWallet()} className="btn w-100 form-btn text-capitalize mt-5">Create Wallet</a>
                                                    </div>
                                                : null
                                            }
                                        </div>
                                    </div>
                                </div>

                                {selectedNetwork && selectedNetwork.name && wallet && wallet.address ?
                                    <>
                                        <div className="wrap-coin-box d-flex flex-lg-row flex-column align-items-lg-start align-items-center mb-50">
                                            <p className="p2 coin-box-space">Withdraw amount</p>
                                            <div className="select-crypto w-100">
                                                <div className="select-crypto w-100">
                                                    <div className="d-flex justify-content-between align-items-center flex-md-row flex-column mb-3">
                                                        <p className="p2 mb-md-0 mb-3">Amount</p>
                                                        <div className="d-flex align-items-center">
                                                            <p className="p2 mb-0">8000000 BUSD / 8000000 BUSD 24hremaining limit</p>
                                                            <FontAwesomeIcon icon={faInfoCircle} className='ms-3' />
                                                        </div>
                                                    </div>
                                                    <div className="coin-dropdown">
                                                        <div className="dropdown mb-3 rcv-amount">
                                                            <button className="btn coin-btn theme-border w-100 d-flex justify-content-between align-items-center" type="button">
                                                                <span>
                                                                    <p className="p2 mb-0 text-uppercase amount-num">0.06556</p>
                                                                </span>
                                                                <input type='float' onChange={(e) => { setAmount(e.target.value) }} />
                                                                <span className="d-flex">
                                                                    <p className="p2 mb-0 text-uppercase amount-num me-3 active-btn">max</p>
                                                                    <p className="p2 mb-0 text-uppercase ms-2">{selectedCurrency && selectedCurrency.symbol ? selectedCurrency.symbol : ""}</p>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="circle-checkbox">
                                                        <div className="d-flex align-items-start justify-content-between">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                    <p className="p2 text-capitalize">Spot Wallet</p>
                                                                </label>
                                                            </div>
                                                            <span className="ms-5">0.15993683 BNB</span>
                                                            <div className="outline-button transfer d-flex align-items-center">
                                                                <div>
                                                                    <a href="" className="outline-btn text-capitalize">
                                                                        <FontAwesomeIcon icon={faArrowLeft} className='me-1' />
                                                                    </a>
                                                                    <a href="" className="outline-btn text-capitalize me-1">
                                                                        <FontAwesomeIcon icon={faArrowRight} />
                                                                    </a>
                                                                </div>
                                                                <p className="mb-0 p2 dot ms-1">transfer</p>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex align-items-start">
                                                            <div className="form-check form-space">
                                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                    <p className="p2 text-capitalize">Spot Wallet</p>
                                                                </label>
                                                            </div>
                                                            <span className="ms-5">0.15993683 BNB</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrap-coin-box d-flex flex-lg-row flex-column align-items-lg-start align-items-center mb-50">
                                            <p className="p2 coin-box-space">Receive amount</p>
                                            <div className="select-crypto w-100">
                                                <div className="d-flex flex-md-row flex-column justify-content-md-between align-items-center ju">
                                                    <div className="mb-md-0 mb-3 text-md-start text-center">
                                                        <span className="text-uppercase d-inline-block mb-3">0.15943683 BNB</span>
                                                        <div className="d-flex align-items-center">
                                                            <p className="p2 mb-0 gray">0.0005 BNB network fee included</p>
                                                            <FontAwesomeIcon icon={faInfoCircle} className='ms-3' />
                                                        </div>
                                                    </div>
                                                    <div className="inline-block" onClick={handleShow}>
                                                        <a className="btn form-btn text-capitalize" >Withdraw
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : ""
                                }
                            </>
                            : ""
                        }
                    </div>
                    <div className="col-lg-4 offset-lg-1  mb-lg-0 mb-4">
                        <div className="faq center-div">
                            <div className="mb-30">
                                <span className="span-2 text-uppercase">faq</span>
                            </div>
                            <div className="video-play">
                                <a href="" className="d-flex align-items-center">
                                    <span><FontAwesomeIcon icon={faPlay} /></span><p className="p2 mb-0">Deposoit unlisted coins</p>
                                </a>
                            </div>
                            <ul className="crypto-guide mb-50">
                                <li>
                                    <div className="guide-icon">
                                        <FontAwesomeIcon icon={faFile} className='me-2' />
                                        <a href=""><p className="p2 mb-0">Deposit has not arrived after a long while.</p></a>
                                    </div>
                                </li>
                                <li>
                                    <div className="guide-icon">
                                        <FontAwesomeIcon icon={faFile} className='me-2' />
                                        <a href=""><p className="p2 mb-0">Didn't enter MEMO/Tag correctly</p></a>
                                    </div>
                                </li>
                                <li>
                                    <div className="guide-icon">
                                        <FontAwesomeIcon icon={faFile} className='me-2' />
                                        <a href=""><p className="p2 mb-0">Deposoit unlisted coins</p></a>
                                    </div>
                                </li>
                                <li>
                                    <div className="guide-icon">
                                        <FontAwesomeIcon icon={faFile} className='me-2' />
                                        <a href=""><p className="p2 mb-0">Deposoit unlisted coins</p></a>
                                    </div>
                                </li>
                                <li>
                                    <div className="guide-icon">
                                        <FontAwesomeIcon icon={faFile} className='me-2' />
                                        <a href=""><p className="p2 mb-0">Deposoit unlisted coins</p></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="text-box">
                            <div className="pay-box d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex align-items-center">
                                    <figure className="mb-0 me-3">
                                        <img src={PayIcon} alt="" className="img-fluid" />
                                    </figure>
                                    <h3 className="text-capitalize">bitwhale pay</h3>
                                </div>
                                <a href="" className="right-arrow-circle">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </a>
                            </div>
                            <p>If you are withdrawing to another bitwhale user, you can use bitwhale Pay for an instant transfer at zero fees.</p>
                            <span className="dot text-capitalize">Address Management</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className='modal-wrapper modal-wrapper-width receive-amount-modal' show={show} onHide={handleClose}>
                <Modal.Header className='modal-main-heading' closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-five-content text-center">
                        <div className="warning-image text-center">
                            <img src={IIcon} className="img-fluid" />
                        </div>
                        <p className="p2">ETH selected as the transfer network.Few platforms support the ETH network. Please confirm that the receiving platform supports this network.</p>
                        <div className="warning-buttons d-flex justify-content-between align-items-center">
                            <div className="inline-block w-100">
                                <a href="" className="theme-brdr-btn text-capitalize">return
                                </a>
                            </div>
                            <div className="inline-block w-100">
                                <Link to="/overview" className="btn form-btn text-capitalize">confirm
                                </Link>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default ReceiveAmountInfo