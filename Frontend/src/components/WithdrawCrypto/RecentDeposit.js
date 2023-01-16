import React, { useState, useEffect } from 'react';
import Binance from '../../assets/images/binance.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faBars, faAngleRight, faLink, faClone } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { getWithdraws } from '../../redux/externalTransactions/externalTransactionActions';

const RecentDeposit = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user?.user?._id);
    const withdraws = useSelector((state) => state.externalTransactions?.withdraws?.withdraws);

    useEffect(() => {
        if (userId) {
            dispatch(getWithdraws(userId))
        }
    }, [userId])

    const copyReferral = () => {
        Swal.fire(
            'Successfully Copied!'
        )
    }

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
                                    {row?.txHash.slice(0, 4)}...{row?.txHash.slice(row?.txHash.length - 4, row?.txHash.length)}
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
                        {row?.isResolved === false ?
                            <span className="badge rounded-pill bg-warning">Pending</span>
                            :
                            <span className="badge rounded-pill bg-success">Completed</span>
                        }
                    </>
                );
            },
        }
    ]

    return (
        <div className="recent-deposit">
            <div className="container-fluid user-screen">
                <div className="d-flex flex-md-row flex-column justify-content-md-between mb-40 align-items-center">
                    <div className="d-flex align-items-center mb-md-0 mb-3">
                        <h3 className="text-capitalize mb-0">Recent Withdrawals</h3>
                        <div className="btn-group ms-5 bar-btn-group " role="group" aria-label="Basic mixed styles example">
                            <button type="button" className="btn btn-bar">
                                <FontAwesomeIcon icon={faTh} />
                            </button>
                            <div className="line"></div>
                            <button type="button" className="btn btn-bar">
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        </div>
                    </div>
                    {/* <div className="d-flex">
                        <div className="inline-block">
                            <a href="" className="btn light-btn">Why has my withdrawal not arrived?</a>
                        </div>
                        <div className="form-check red-checkbox ms-lg-4 ms-3">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Default checkbox
                            </label>
                        </div>
                    </div> */}
                </div>
                <div className="deposit-data">
                    <DataTable
                        columns={withdrawColumns}
                        data={withdraws}
                        pagination
                        fixedHeader
                        persistTableHead
                        theme='solarized'
                    />
                </div>
            </div>

        </div>
    )
}

export default RecentDeposit