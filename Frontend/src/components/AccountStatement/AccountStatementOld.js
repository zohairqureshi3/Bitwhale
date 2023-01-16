import React, { useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faClone } from '@fortawesome/free-solid-svg-icons';
import { Tabs, Tab } from 'react-bootstrap';
import { getCurrency } from '../../redux/currencies/currencyActions';
import { useDispatch, useSelector } from "react-redux";

const AccountStatementOld = () => {

    const dispatch = useDispatch();
    const currencyData = useSelector((state) => state.currency?.currencies?.allCurrencies);
    const AccountData = useSelector((state) => state.accounts?.account);
    const Amounts = useSelector((state) => state.accounts?.account?.amounts);

    useEffect(() => {
        dispatch(getCurrency());
    }, []);

    return (
        <>
            <section className='account-statement overview section-padding transection-history-section'>
                <div className="row">
                    <SideBar />

                    <div className="col-lg-10">
                        <div className="transaction-history fade-color">
                            <div className="transaction-history-heading-section d-flex justify-content-between">
                                <h3>Account Statement</h3>
                                <div className="share-link">
                                    <a href="#" className="share-link-content d-flex align-items-center">
                                        <FontAwesomeIcon icon={faShareSquare} />
                                        <p className="m-0">Generate all statements</p>
                                    </a>
                                </div>
                            </div>







                            <Tabs defaultActiveKey="crypto" id="uncontrolled-tab-example" className="mb-5">
                                <Tab eventKey="crypto" title="Completed">

                                    <div className="deposit-history d-flex">
                                        <p className="deposit-info">Account Statement hasn't arrived? <a href="#" className="click">Click here</a></p>
                                        <div className="share-link deposit-link">
                                            <a href="#" className="share-link-content d-flex align-items-center">
                                                <FontAwesomeIcon icon={faShareSquare} />
                                                <p className="m-0">Export Account Statement History</p>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="responsive-table table-responsive">
                                        <table className="table table-hover deposit-table">
                                            <thead className="deposit-table-header">
                                                <tr>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Deposit Wallet</th>
                                                    <th scope="col">Asset</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Destination</th>
                                                    <th scope="col">TxID</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr data-bs-toggle="modal" data-bs-target="#exampleModalthree" >
                                                    <th scope="row">2022-02-02 19:36</th>
                                                    <td>Deposit</td>
                                                    <td>Spot Wallet</td>
                                                    <td>USDT</td>
                                                    <td>4000</td>
                                                    <td>oxacd…..34466<FontAwesomeIcon icon={faClone} className="ms-2" /></td>
                                                    <td>96408702002 Internal</td>
                                                    <td>Completed</td>
                                                </tr>
                                                <tr data-bs-toggle="modal" data-bs-target="#exampleModalthree">
                                                    <th scope="row">2022-02-02 19:36</th>
                                                    <td>Deposit</td>
                                                    <td>Spot Wallet</td>
                                                    <td>USDT</td>
                                                    <td>4000</td>
                                                    <td>oxacd…..34466<FontAwesomeIcon icon={faClone} className="ms-2" /></td>
                                                    <td>96408702002 Internal</td>
                                                    <td>Completed</td>
                                                </tr>
                                                <tr data-bs-toggle="modal" data-bs-target="#exampleModalthree">
                                                    <th scope="row">2022-02-02 19:36</th>
                                                    <td>Deposit</td>
                                                    <td>Spot Wallet</td>
                                                    <td>USDT</td>
                                                    <td>4000</td>
                                                    <td>oxacd…..34466<FontAwesomeIcon icon={faClone} className="ms-2" /></td>
                                                    <td>96408702002 Internal</td>
                                                    <td>Completed</td>
                                                </tr>
                                                <tr data-bs-toggle="modal" data-bs-target="#exampleModalthree">
                                                    <th scope="row">2022-02-02 19:36</th>
                                                    <td>Deposit</td>
                                                    <td>Spot Wallet</td>
                                                    <td>USDT</td>
                                                    <td>4000</td>
                                                    <td>oxacd…..34466<FontAwesomeIcon icon={faClone} className="ms-2" /></td>
                                                    <td>96408702002 Internal</td>
                                                    <td>Completed</td>
                                                </tr>
                                                <tr data-bs-toggle="modal" data-bs-target="#exampleModalthree">
                                                    <th scope="row">2022-02-02 19:36</th>
                                                    <td>Deposit</td>
                                                    <td>Spot Wallet</td>
                                                    <td>USDT</td>
                                                    <td>4000</td>
                                                    <td>oxacd…..34466<FontAwesomeIcon icon={faClone} className="ms-2" /></td>
                                                    <td>96408702002 Internal</td>
                                                    <td>Completed</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab>
                                <Tab eventKey="fait" title="Inprogress">

                                    <div className="deposit-history d-flex">
                                        <p className="deposit-info">Account Statement hasn't arrived? <a href="#" className="click">Click here</a></p>
                                        <div className="share-link deposit-link">
                                            <a href="#" className="share-link-content d-flex align-items-center">
                                                <FontAwesomeIcon icon={faShareSquare} />
                                                <p className="m-0">Export Account Statement History</p>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="responsive-table table-responsive">
                                        <table className="table table-hover deposit-table">
                                            <thead className="deposit-table-header">
                                                <tr>
                                                    <th scope="col">Time</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Deposit Wallet</th>
                                                    <th scope="col">Asset</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Destination</th>
                                                    <th scope="col">TxID</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr data-bs-toggle="modal" data-bs-target="#exampleModalthree">
                                                    <th scope="row">2022-02-02 19:36</th>
                                                    <td>Deposit</td>
                                                    <td>Spot Wallet</td>
                                                    <td>USDT</td>
                                                    <td>7000</td>
                                                    <td>oxacd…..34466<FontAwesomeIcon icon={faClone} className="ms-2" /></td>
                                                    <td>96408702002 Internal</td>
                                                    <td>Inprogress</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab>



                            </Tabs>












                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccountStatementOld