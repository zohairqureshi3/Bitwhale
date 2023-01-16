import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faSortDesc, faClone } from '@fortawesome/free-solid-svg-icons';
import SideBar from '../SideBar/SideBar';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { getInternalOrders } from '../../redux/internalOrder/internalOrderActions';
import { getDeposits, getExternalTransactions, getWithdraws } from '../../redux/externalTransactions/externalTransactionActions';
import DataTable, { createTheme } from 'react-data-table-component';

createTheme('solarized', {
    text: {
        primary: '#fff',
        secondary: '#fff',
    },
    background: {
        default: '#070829',
    },
    context: {
        background: '#fff',
        text: '#FFFFFF',
    },
    divider: {
        default: '#fff',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
}, 'dark');


const TransectionHistoryInfo = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const copyReferral = () => {
        Swal.fire({
            // title: 'Success',
            text: 'Successfully copied!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
        })
    }

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user?.user?._id);
    const orders = useSelector((state) => state.internalOrders?.orders?.userOrders);
    // const externalTransactions = useSelector((state) => state.externalTransactions?.transactions?.externalTransactions);
    const withdraws = useSelector((state) => state.externalTransactions?.withdraws?.withdraws);
    const deposits = useSelector((state) => state.externalTransactions?.deposits?.deposits);

    useEffect(() => {
        if (userId) {
            dispatch(getInternalOrders(userId));
            dispatch(getExternalTransactions(userId))
            dispatch(getDeposits(userId))
            dispatch(getWithdraws(userId))
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

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const depositColumns = [
        {
            name: 'Recieved At',
            selector: row => formatDate(new Date(row?.createdAt)),
            sortable: true,
        },
        {
            name: 'Asset',
            selector: row => row?.currency,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row?.amount,
            sortable: true,
        },
        {
            name: 'Deposited From',
            selector: row => {
                return (
                    <>
                        <CopyToClipboard text={row?.fromAddress}>
                            <span>
                                {row?.fromAddress.slice(0, 4)}...{row?.fromAddress.slice(row?.fromAddress.length - 4, row?.fromAddress.length)}
                                <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} className="ms-2" />
                            </span>
                        </CopyToClipboard>
                    </>
                );
            },
        },
        {
            name: 'Deposit Wallet',
            selector: row => {
                return (
                    <>
                        <CopyToClipboard text={row?.toAddress}>
                            <span>
                                {row?.toAddress.slice(0, 4)}...{row?.toAddress.slice(row?.toAddress.length - 4, row?.toAddress.length)}
                                <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} className="ms-2" />
                            </span>
                        </CopyToClipboard>
                    </>
                );
            },
        },
        {
            name: 'TxID',
            selector: row => {
                return (
                    <>
                        <CopyToClipboard text={row?.txHash}>
                            <span>
                                {row?.txHash.slice(0, 4)}...{row?.txHash.slice(row?.txHash.length - 4, row?.txHash.length)}
                                <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} className="ms-2" />
                            </span>
                        </CopyToClipboard>
                    </>
                );
            },
        },
        {
            name: 'Status',
            selector: row => {
                return (
                    <>
                        {row?.isResolved == 0 ?
                            <span className="badge rounded-pill bg-warning">Pending</span>
                            :
                            <span className="badge rounded-pill bg-success">Completed</span>
                        }
                    </>
                );
            },
        }
    ]

    const withdrawColumns = [
        {
            name: 'Withdrawn At',
            selector: row => formatDate(new Date(row?.createdAt)),
            sortable: true,
        },
        {
            name: 'Asset',
            selector: row => row?.currency,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row?.amount,
            sortable: true,
        },
        {
            name: 'Withdraw Wallet',
            selector: row => {
                return (
                    <>
                        <CopyToClipboard text={row?.toAddress}>
                            <span>
                                {row?.toAddress.slice(0, 4)}...{row?.toAddress.slice(row?.toAddress.length - 4, row?.toAddress.length)}
                                <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} className="ms-2" />
                            </span>
                        </CopyToClipboard>
                    </>
                );
            },
        },
        {
            name: 'TxID',
            selector: row => {
                return (
                    <>
                        {row?.txHash ?
                            <CopyToClipboard text={row?.txHash}>
                                <span>
                                    {row?.txHash?.slice(0, 4)}...{row?.txHash?.slice(row?.txHash?.length - 4, row?.txHash?.length)}
                                    <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} className="ms-2" />
                                </span>
                            </CopyToClipboard>
                            : "-"
                        }
                    </>
                );
            },
        },
        {
            name: 'Status',
            selector: row => {
                return (
                    <>
                        {row?.isResolved == 0 ?
                            <span className="badge rounded-pill bg-warning">Pending</span>
                            :
                            <span className="badge rounded-pill bg-success">Completed</span>
                        }
                    </>
                );
            },
        }
    ]

    const ordersColumns = [
        {
            name: 'Order Coin',
            selector: row => row?.fromCurrency?.symbol,
            sortable: true,
        },
        {
            name: 'Order Amount',
            selector: row => row?.fromAmount,
            sortable: true,
        },
        {
            name: 'Converted Coin',
            selector: row => row?.toCurrency?.symbol,
            sortable: true,
        },
        {
            name: 'Converted Amount',
            selector: row => row?.convertedAmount,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => {
                return (
                    <>
                        {row?.isResolved == 0 ?
                            <span className="badge rounded-pill bg-warning">Pending</span>
                            :
                            <span className="badge rounded-pill bg-success">Completed</span>
                        }
                    </>
                );
            },
        },
        {
            name: 'Ordered At',
            selector: row => formatDate(new Date(row?.createdAt)),
            sortable: true,
        }
    ]

    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
        }
    };

    const subHeaderComponentMemo = useMemo(() => {

        return (
            <>
                <input
                    id="search"
                    type="text"
                    className='w-25 form-control datatable-search-box'
                    placeholder="Search here..."
                    aria-label="Search Input"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <button type="button" className='btn btn-primary datatable-clear-btn' onClick={handleClear}>Clear</button>
            </>
        );
    }, [filterText, resetPaginationToggle]);

    return (

        <section className="overview section-padding transection-history-section">
            <div className="row">

                <SideBar />

                <div className="col-lg-10">
                    <div className="transaction-history fade-color">
                        <div className="transaction-history-heading-section d-flex justify-content-between">
                            <h3>Transaction History</h3>
                            {/* <div className="share-link">
                                <a href="#" className="share-link-content d-flex align-items-center">
                                    <FontAwesomeIcon icon={faShareSquare} />
                                    <p className="m-0">Generate all statements</p>
                                </a>
                            </div> */}
                        </div>

                        <Tabs defaultActiveKey="deposit" id="uncontrolled-tab-example" className="mb-5" onClick={handleClear}>
                            <Tab eventKey="deposit" title="Deposit">
                                <div className='table-responsive'>
                                    {deposits && deposits.length ?
                                        <DataTable
                                            columns={depositColumns}
                                            data=
                                            {
                                                deposits.filter(row => (row.currency?.toLowerCase().includes(filterText.toLowerCase()) || row.fromAddress?.toLowerCase().includes(filterText.toLowerCase()) ||
                                                    row.toAddress?.toLowerCase().includes(filterText.toLowerCase()) || row.txHash?.toLowerCase().includes(filterText.toLowerCase())))
                                            }
                                            pagination
                                            paginationResetDefaultPage={resetPaginationToggle}
                                            subHeader
                                            subHeaderComponent={subHeaderComponentMemo}
                                            fixedHeader
                                            persistTableHead
                                            theme="solarized"
                                        />
                                        :
                                        <span colSpan="7" >No Transactions found</span>
                                    }
                                </div>
                                {/* <div className="responsive-table table-responsive">
                                    <table className="table table-hover deposit-table">
                                        <thead className="deposit-table-header">
                                            <tr>
                                                <th scope="col">Time</th>
                                                <th scope="col">Asset</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Deposited From</th>
                                                <th scope="col">Deposit Wallet</th>
                                                <th scope="col">TxID</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {externalTransactions && externalTransactions.filter(row => row.transactionType == 0).length ?
                                                externalTransactions.filter(row => row.transactionType == 0).map((transaction, index) =>
                                                    // <tr data-bs-toggle="modal" data-bs-target="#exampleModalthree" onClick={handleShow} >
                                                    <tr>
                                                        <th scope="row">{formatDate(new Date(transaction.createdAt))}</th>
                                                        <td>{transaction.currency}</td>
                                                        <td>{transaction.amount}</td>
                                                        <td>
                                                            <span>{transaction.fromAddress}</span>
                                                            <CopyToClipboard text={transaction.fromAddress} >
                                                                <span className="ms-2">
                                                                    <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} />
                                                                </span>
                                                            </CopyToClipboard>
                                                        </td>
                                                        <td>
                                                            <span>{transaction.toAddress}</span>
                                                            <CopyToClipboard text={transaction.toAddress} >
                                                                <span className="ms-2">
                                                                    <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} />
                                                                </span>
                                                            </CopyToClipboard>
                                                        </td>
                                                        <td>
                                                            <span>{transaction.txHash}</span>
                                                            <CopyToClipboard text={transaction.txHash} >
                                                                <span className="ms-2">
                                                                    <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} />
                                                                </span>
                                                            </CopyToClipboard></td>
                                                        <td>{transaction.isResolved == 0 ?
                                                            <span className="badge rounded-pill bg-warning">Pending</span>
                                                            :
                                                            <span className="badge rounded-pill bg-success">Completed</span>
                                                        }</td>
                                                    </tr>
                                                )
                                                :
                                                <tr >
                                                    <td colSpan="7" >No Transactions found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div> */}
                            </Tab>
                            <Tab eventKey="conversions" title="Conversions">
                                <div className='table-responsive'>
                                    {orders && orders.length ?
                                        <DataTable
                                            columns={ordersColumns}
                                            data=
                                            {
                                                filterText == '' ? orders : orders.filter(row => (row.fromCurrency?.symbol?.toLowerCase().includes(filterText.toLowerCase()) ||
                                                    row.toCurrency?.symbol?.toLowerCase().includes(filterText.toLowerCase())))
                                            }
                                            pagination
                                            paginationResetDefaultPage={resetPaginationToggle}
                                            subHeader
                                            subHeaderComponent={subHeaderComponentMemo}
                                            fixedHeader
                                            persistTableHead
                                            theme="solarized"
                                        />
                                        :
                                        <span colSpan="7" >No Transactions found</span>
                                    }
                                </div>
                                {/* <div className="responsive-table table-responsive">
                                    <table className="table table-hover deposit-table">
                                        <thead className="deposit-table-header">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Order Coin</th>
                                                <th scope="col">Order Amount</th>
                                                <th scope="col">Converted Coin</th>
                                                <th scope="col">Converted Amount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Ordered at</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders && orders.length ?
                                                orders.map((order, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index}</th>
                                                        <td>{order.fromCurrency.symbol}</td>
                                                        <td>{order.fromAmount}</td>
                                                        <td>{order.toCurrency.symbol}</td>
                                                        <td>{order.convertedAmount}</td>
                                                        <td>{order.isResolved == 0 ?
                                                            <span className="badge rounded-pill bg-warning">Pending</span>
                                                            :
                                                            <span className="badge rounded-pill bg-success">Completed</span>
                                                        }</td>
                                                        <td>{formatDate(new Date(order.createdAt))}</td>
                                                    </tr>
                                                )
                                                :
                                                <tr >
                                                    <td colSpan="7" >No Conversion Orders found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div> */}
                            </Tab>
                            <Tab eventKey="withdraws" title="Withdraws">
                                <div className='table-responsive'>
                                    {withdraws && withdraws.length ?
                                        <DataTable
                                            columns={withdrawColumns}
                                            data=
                                            {
                                                withdraws.filter(row => (row.currency?.toLowerCase().includes(filterText.toLowerCase()) ||
                                                    row.toAddress?.toLowerCase().includes(filterText.toLowerCase()) || row.txHash?.toLowerCase().includes(filterText.toLowerCase()) ||
                                                    row.isResolved === 'Completed'.toLowerCase().includes(filterText.toLowerCase())))

                                            }
                                            pagination
                                            paginationResetDefaultPage={resetPaginationToggle}
                                            subHeader
                                            subHeaderComponent={subHeaderComponentMemo}
                                            fixedHeader
                                            persistTableHead
                                            theme="solarized"
                                        />
                                        :
                                        <span colSpan="7" >No Transactions found</span>
                                    }
                                </div>
                                {/* <form className="transaction-selection d-flex">
                                    <div className="transaction-selection-content">
                                        <label>Type</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Deposit</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <FontAwesomeIcon icon={faSortDesc} className="arrow-down" />
                                    </div>
                                    <div className="transaction-selection-content">
                                        <label>Time</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Past 30 days</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <FontAwesomeIcon icon={faSortDesc} className="arrow-down" />
                                    </div>
                                    <div className="transaction-selection-content">
                                        <label>Asset</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>All</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <FontAwesomeIcon icon={faSortDesc} className="arrow-down" />
                                    </div>
                                    <div className="transaction-selection-content">
                                        <label>Status</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>All</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <FontAwesomeIcon icon={faSortDesc} className="arrow-down" />
                                    </div>
                                    <div className="transaction-selection-content">
                                        <label>TxID</label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Enter TxID</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <FontAwesomeIcon icon={faSortDesc} className="arrow-down" />
                                    </div>
                                </form> */}

                                {/* <div className="responsive-table table-responsive">
                                    <table className="table table-hover deposit-table">
                                        <thead className="deposit-table-header">
                                            <tr>
                                                <th scope="col">Time</th>
                                                <th scope="col">Asset</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Withdraw to Wallet</th>
                                                <th scope="col">TxID</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {externalTransactions && externalTransactions.filter(row => row.transactionType == 1).length ?
                                                externalTransactions.filter(row => row.transactionType == 1).map((transaction, index) =>
                                                    // <tr data-bs-toggle="modal" data-bs-target="#exampleModalthree" onClick={handleShow} >
                                                    <tr>
                                                        <th scope="row">{formatDate(new Date(transaction.createdAt))}</th>
                                                        <td>{transaction.currency}</td>
                                                        <td>{transaction.amount}</td>
                                                        <td>
                                                            <span>{transaction.toAddress}</span>
                                                            <CopyToClipboard text={transaction.toAddress} >
                                                                <span className="ms-2">
                                                                    <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} />
                                                                </span>
                                                            </CopyToClipboard>
                                                        </td>
                                                        <td>
                                                            <span>{transaction.txHash}</span>
                                                            <CopyToClipboard text={transaction.txHash} >
                                                                <span className="ms-2">
                                                                    <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} />
                                                                </span>
                                                            </CopyToClipboard></td>
                                                        <td>{transaction.isResolved == 0 ?
                                                            <span className="badge rounded-pill bg-warning">Pending</span>
                                                            :
                                                            <span className="badge rounded-pill bg-success">Completed</span>
                                                        }</td>
                                                    </tr>
                                                )
                                                :
                                                <tr >
                                                    <td colSpan="7" >No Transactions found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div> */}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>

            <Modal className='modal-wrapper' show={show} onHide={handleClose}>
                <Modal.Header className='modal-main-heading' closeButton>
                    <div className="modal-main-heading-content">
                        <h5 className="modal-title" id="exampleModalLabel">Deposit Details</h5>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="deposit-details d-flex justify-content-between align-items-center">
                        <div className="deposit-details-content">
                            <p className="m-0">Status</p>
                        </div>
                        <div className="deposit-details-content-info details-dot d-flex align-items-center">
                            <p className="m-0"> Completed</p>
                        </div>
                    </div>
                    <div className="deposit-details d-flex justify-content-between align-items-center">
                        <div className="deposit-details-content">
                            <p className="m-0">Date</p>
                        </div>
                        <div className="deposit-details-content-info d-flex align-items-center">
                            <p className="m-0"> 2022-02-01 19:36</p>
                        </div>
                    </div>
                    <div className="deposit-details d-flex justify-content-between align-items-center">
                        <div className="deposit-details-content">
                            <p className="m-0">Coin</p>
                        </div>
                        <div className="deposit-details-content-info d-flex align-items-center">
                            <p className="m-0"> USTD</p>
                        </div>
                    </div>
                    <div className="deposit-details d-flex justify-content-between align-items-center">
                        <div className="deposit-details-content">
                            <p className="m-0">Deposit Amount</p>
                        </div>
                        <div className="deposit-details-content-info d-flex align-items-center">
                            <p className="m-0"> 400</p>
                        </div>
                    </div>
                    <div className="deposit-details d-flex justify-content-between align-items-center">
                        <div className="deposit-details-content">
                            <p className="m-0">Network</p>
                        </div>
                        <div className="deposit-details-content-info d-flex align-items-center">
                            <p className="m-0"> BSC</p>
                        </div>
                    </div>
                    <div className="deposit-details d-flex justify-content-between align-items-center">
                        <div className="deposit-details-content">
                            <p className="m-0">Address</p>
                        </div>
                        <div className="deposit-details-content-info d-flex align-items-center">
                            <p className="m-0"> 0xacd26bc24aae55be583e4903ac4e0f2f1d434466</p>
                            <FontAwesomeIcon icon={faClone} className="ms-2" />
                        </div>
                    </div>
                    <div className="deposit-details d-flex justify-content-between align-items-center">
                        <div className="deposit-details-content">
                            <p className="m-0">Note</p>
                        </div>
                        <div className="deposit-details-content-info d-flex align-items-center">
                            <p className="m-0"> 678890009087787 Internal</p>
                            <FontAwesomeIcon icon={faClone} className="ms-2" />
                        </div>
                    </div>
                    <div className="deposit-details d-flex justify-content-between align-items-center">
                        <div className="deposit-details-content">
                            <p className="m-0">Deposit Wallet</p>
                        </div>
                        <div className="deposit-details-content-info d-flex align-items-center">
                            <p className="m-0"> Spot Wallet</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </section>

    )
}

export default TransectionHistoryInfo