import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import Logo from '../../assets/images/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import { ENV } from "../../config/config";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { faClone } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/users/userActions';
import Swal from 'sweetalert2';
// import { getAccount } from '../../redux/account/accountActions';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate(true)
    let user = {}
    let userkeys = ENV.getUserKeys()
    if (userkeys) {
        user = JSON.parse(userkeys)[0]
    }

    const [masterId, setMasterId] = useState("")
    const [refCount, setRefCount] = useState(0)
    const [path, setPath] = useState('/');

    const token = localStorage.getItem('uToken');
    const WalletAddress = localStorage.getItem('WalletAddress');

    const activeTab = (path) => {
        setPath(path)
        navigate(path)
    }

    useEffect(() => {
        const pathname = window.location.pathname;
        setPath(pathname)
    }, []);

    useEffect(() => {
        dispatch(setUser(user));
        // if (user && user.userId)
        //     dispatch(getAccount(user?.userId));
        setMasterId(user?.users ? user?.users._id : "")
        setRefCount(user ? user?.refCount : 0)
    }, [])

    const logOut = () => {
        localStorage.removeItem('uToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('uId');
        localStorage.removeItem('WalletAddress');
        navigate('/login');
    }

    const copyReferral = () => {
        Swal.fire({
            text: 'Successfully Copied!',
            icon: 'success'
        })
    }

    return (

        <div className="header header-js">
            <Navbar className="navbar navbar-expand-lg navbar-light" expand="lg">
                <Container fluid style={{ display: "unset" }}>
                    <div className="row align-items-center">

                        <div className="col-lg-2">
                            <Link to="/" className={path === "/" ? "text-uppercase navbar-brand " : ""} onClick={() => activeTab('/')}>
                                <figure className="mb-0">
                                    <Image src={Logo} fluid />
                                </figure>
                            </Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        </div>

                        <div className="col-md-10">
                            <div className="d-flex">
                                <Navbar.Collapse className="collapse navbar-collapse" id="basic-navbar-nav">
                                    <Nav className="me-auto navbar-nav me-auto mb-2 mb-lg-0">
                                        <Link to='/deposit' className={path === "/deposit" ? "active nav-item nav-link " : "nav-item nav-link"} onClick={() => activeTab('/deposit')}>Deposit</Link>
                                        <Link to='/market' className={path === "/market" ? "active nav-item nav-link" : "nav-item nav-link"} onClick={() => activeTab('/market')} >market</Link>
                                        <div className='trade-hover-dropdown'>
                                            <Link to='#' className={path === "/trade" ? "active nav-item nav-link" : "nav-item nav-link"} onClick={() => activeTab('/trade')}>trade</Link>
                                            <div className='trade-submenus'>
                                                <Link className="nav-item nav-link" to={`/trade/BTCUSDT`}>BTCUSDT</Link>
                                                <Link className="nav-item nav-link" to={`/trade/XRPUSDT`}>XRPUSDT</Link>
                                                <Link className="nav-item nav-link" to={`/trade/ETHBTC`}>ETHBTC</Link>
                                                <Link className="nav-item nav-link" to={`/trade/ETHUSDT`}>ETHUSDT</Link>
                                                <Link className="nav-item nav-link" to={`/trade/XRPETH`}>XRPETH</Link>
                                                <Link style={{ width: "90px" }} className="nav-item nav-link" to={`/trade/XRPBTC`}>XRPBTC</Link>
                                            </div>
                                        </div>
                                        {/* <Dropdown className='user-dropdown'>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <Link to='#' className={path === "/trade" ? "active nav-item nav-link" : "nav-item nav-link"} onClick={() => activeTab('/trade')}>trade</Link>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Link className="dropdown-item" to={`/trade/BTCUSDT`}>BTCUSDT</Link>
                                                <Link className="dropdown-item" to={`/trade/XRPUSDT`}>XRPUSDT</Link>
                                                <Link className="dropdown-item" to={`/trade/ETHBTC`}>ETHBTC</Link>
                                                <Link className="dropdown-item" to={`/trade/ETHUSDT`}>ETHUSDT</Link>
                                                <Link className="dropdown-item" to={`/trade/XRPETH`}>XRPETH</Link>
                                                <Link className="dropdown-item" to={`/trade/XRPBTC`}>XRPBTC</Link>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                        <Link to='/futures' className={path === "/futures" ? "active nav-item nav-link" : "nav-item nav-link"} onClick={() => activeTab('/futures')}>Futures</Link>
                                    </Nav>
                                </Navbar.Collapse>
                                <div className="d-flex ms-lg-auto mb-0 nav-2 align-items-sm-center align-items-end align-items-center-important">
                                    {token ?
                                        <>
                                            <ul className="navbar-nav right-nav me-auto mb-0 mb-lg-0 none-dropdown-links">
                                                <li className="nav-item">
                                                    <Link to='/overview' className={path === "/overview" ? "active nav-link" : "nav-link"} onClick={() => activeTab('/overview')} aria-current="page">wallet</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to='/convert-history' className={path === "/convert-history" ? "active nav-link" : "nav-link"} onClick={() => activeTab('/convert-history')}>transactions</Link>
                                                </li>
                                            </ul>

                                            <Dropdown className='user-dropdown ms-3'>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Link className="dropdown-item" to='#'>
                                                        {token && user?.refCount >= 0 && user?.refCount < 2 ?
                                                            <>

                                                                <div className='d-flex'>
                                                                    <div className="dashboard-localhost-address">{masterId + "-" + refCount}</div>

                                                                    <CopyToClipboard text={masterId + "-" + refCount} >
                                                                        <span className="ms-2"><FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} /></span>
                                                                    </CopyToClipboard>
                                                                </div>
                                                            </>
                                                            : ""
                                                        }
                                                    </Link>
                                                    <Link className="dropdown-item" to={`/profile-setting`}>Profile Setting</Link>
                                                    <Link className="dropdown-item" to={`/change-password`}>Change Password</Link>
                                                    {/* <Link className="dropdown-item" to={`/settings`}>Settings</Link> */}
                                                    <a className="dropdown-item" href={`/login`} onClick={() => logOut()}>{'Log Out'}</a>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </>
                                        :
                                        <>
                                            <a className="btn hide-btn btn-lang">english USD</a>
                                            <a href="" className="btn-icon" title="English USD"><FontAwesomeIcon icon={faGlobe} className='fa fa-solid' /></a>
                                            <Link to={`/login`} className="btn hide-btn btn-login" type="button">Log in</Link>
                                        </>
                                    }
                                    {/* <div className="d-flex justify-content-center align-items-center ms-lg-4 ms-3 header-global-icon">
                                        {token ?
                                            <>
                                                <Link to="/settings" className="btn-icon login-btn" title="Log in"><FontAwesomeIcon icon={faUser} className='fa' /></Link>
                                                <button className="btn hide-btn btn-login" type="button" onClick={logOut}>Logout</button>
                                            </>
                                            :
                                            <>
                                                <a className="btn hide-btn btn-lang">english USD</a>
                                                <a href="" className="btn-icon" title="English USD"><FontAwesomeIcon icon={faGlobe} className='fa fa-solid' /></a>
                                                <Link to="/login" className="btn hide-btn btn-login" type="button">Log in</Link>
                                            </>
                                        }
                                    </div> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </Navbar>

        </div>
    )
}

export default Header