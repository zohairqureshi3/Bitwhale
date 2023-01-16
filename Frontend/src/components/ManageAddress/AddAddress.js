import { React, useEffect, useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { getCurrency } from '../../redux/currencies/currencyActions';
import { getNetwork } from '../../redux/networks/networkActions';
import { addWallet } from '../../redux/addresses/externalWalletActions';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const AddAddress = () => {

    const [show, setShow] = useState(false);
    const [label, setLabel] = useState('');
    const [address, setAddress] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState([]);
    const [selectedNetwork, setSelectedNetwork] = useState([]);

    const dispatch = useDispatch();
    const currencyData = useSelector((state) => state.currency?.currencies?.allCurrencies);
    const networks = useSelector((state) => state.networks?.networks);
    const userId = useSelector((state) => state.user?.user?._id);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getCurrency());
        dispatch(getNetwork());
    }, []);

    const handleAdd = () => {
        const data = {
            name: label,
            address: address,
            symbol: selectedNetwork.symbol,
            networkId: selectedNetwork._id,
            currencyId: selectedCurrency._id,
            userId: userId
        }
        console.log(data);
        dispatch(addWallet(data));
        setSelectedCurrency([])
        setSelectedNetwork([])
        handleClose();
    }

    return (
        <div>
            <section className="overview section-padding">
                <div className='container-fluid user-screen'>
                    <div className="inline-block mt-5 d-flex justify-content-between">
                        <Link to="/withdraw-crypto" className="dot text-capitalize">
                            <FontAwesomeIcon icon={faAngleLeft} style={{ marginRight: "20px" }} />
                        </Link>
                        <a className="btn form-btn text-capitalize" onClick={handleShow}>
                            Add Address
                        </a>
                    </div>
                </div>
            </section>

            <Modal className="modal-wrapper modal-six-wrapper withdraw-crypo-modal" show={show} onHide={handleClose}>
                <Modal.Header className='modal-main-heading' closeButton>
                    <div className="modal-main-heading-content">
                        <h3 className="modal-title">Add Address</h3>
                        <span className="header-border"></span>
                    </div>
                </Modal.Header>


                <Modal.Body>

                    <form className="address-form wrap-address-form m-auto">
                        <div className="input-group buttonInside mb-3">
                            <span className="text-dark">Address Label</span>
                            <input
                                type="text"
                                className="form-control w-100"
                                placeholder="Enter Address label"
                                onChange={(e) => setLabel(e.target.value)}
                            />
                        </div>
                        <div className="input-group buttonInside mb-3">
                            <span className="text-dark">Select Coin</span>
                            <Dropdown className="coin-dropdown w-100">
                                <div className="dropdown mb-3">
                                    <Dropdown.Toggle id="dropdown-basic" className="btn coin-btn w-100 dropdown-toggle" type="button" >
                                        {selectedCurrency && selectedCurrency.symbol ?
                                            <>
                                                <figure className="mb-0 toggle-img">
                                                    <img src={require(`../../assets/images/${selectedCurrency.symbol}.png`).default} alt="" className="img-fluid" />
                                                </figure>
                                                <p className="p2 mb-0 text-dark">{selectedCurrency.symbol} <p className="gray mb-0 ms-1">{selectedCurrency.name}</p></p>
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

                        {selectedCurrency && selectedCurrency._id ?
                            <>
                                <div className="input-group buttonInside mb-3">
                                    <span className="text-dark">Select Network</span>
                                    <Dropdown className="coin-dropdown w-100">
                                        <div className="dropdown mb-3">
                                            <Dropdown.Toggle id="dropdown-basic" className="btn coin-btn w-100 dropdown-toggle" type="button">
                                                {selectedNetwork && selectedNetwork.name ?
                                                    <>
                                                        <figure className="mb-0 toggle-img">
                                                            <img src={require(`../../assets/images/${selectedNetwork.symbol}.png`).default} alt="" className="img-fluid" />
                                                        </figure>
                                                        <p className="p2 mb-0 text-dark"> {selectedNetwork.symbol} <p className="gray mb-0 ms-1">{selectedNetwork.name}</p></p>
                                                    </>
                                                    :
                                                    "Select Network"
                                                }
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {networks && networks.length > 0 && networks.filter(network => network.currencies.some((o) => o._id === selectedCurrency._id)).map((network) => (
                                                    <Dropdown.Item onClick={() => { setSelectedNetwork(network) }}>{network.name}</Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </div>
                                    </Dropdown>
                                </div>

                                {selectedNetwork && selectedNetwork.name ?
                                    <>
                                        <div className="input-group buttonInside mb-3">
                                            <span className="text-dark">Address</span>
                                            <input
                                                type="text"
                                                className="form-control w-100"
                                                placeholder="Enter Address Code"
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="d-block">
                                            <button type="button" onClick={() => handleAdd()} className="btn w-100 form-btn text-capitalize">
                                                Continue
                                            </button>
                                        </div>
                                    </>
                                    : ""
                                }
                            </>
                            : ""
                        }
                    </form>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default AddAddress