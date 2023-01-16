import React, { useEffect, useState } from 'react';
import Binance from '../../assets/images/binance.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faBars, faAngleRight, faClone } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { deleteWallet, getWallets } from '../../redux/addresses/externalWalletActions';
import { useDispatch, useSelector } from "react-redux";
import DataTable from 'react-data-table-component';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from 'sweetalert2';

const Addresses = () => {
    const [show, setShow] = useState(false);
    const [viewWallet, setViewWallet] = useState(false);

    const dispatch = useDispatch();
    const externalWallets = useSelector((state) => state.externalWallets.externalWallets);
    const userId = useSelector((state) => state.user.user._id);
    console.log(externalWallets, "externalWallets");
    useEffect(() => {
        if (userId)
            dispatch(getWallets(userId));
    }, [userId]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const copyReferral = () => {
        Swal.fire({
            text: 'Successfully Copied!',
            icon: 'success'
        }
        )
    }
    const deleteAction = (id) => {
        Swal.fire({
            title: `Are you sure want to Delete?`,
            html: '',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed === true ? true : false) {
                dispatch(deleteWallet(id))
            }
        })
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

    const columns = [
        {
            name: 'Address Label',
            selector: row => row?.name,
            sortable: true,
        },
        {
            name: 'Network',
            selector: row => row?.symbol,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => {
                return (
                    <>
                        <CopyToClipboard text={row?.address}>
                            <span>
                                {row?.address.slice(0, 4)}...{row?.address.slice(row?.address.length - 4, row?.address.length)}
                                <FontAwesomeIcon icon={faClone} onClick={() => copyReferral()} className="ms-2" />
                            </span>
                        </CopyToClipboard>
                    </>
                );
            },
        },
        {
            name: 'Wallet Type',
            selector: row => "Withdrawal",
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => formatDate(new Date(row?.createdAt)),
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => {
                return (
                    <>
                        <button className="btn btn-danger btn-sm me-1 p-1" onClick={() => deleteAction(row._id)}>Delete</button>
                    </>
                );
            },
        }
    ]

    return (
        <section className="recent-deposit">
            <div className="container-fluid user-screen">
                <div className="d-flex flex-md-row flex-column justify-content-md-between mb-40 align-items-center">
                    <div className="d-flex align-items-center mb-md-0 mb-3">
                        <h3 className="text-capitalize mb-0">Addresses</h3>
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
                            <a href="" className="btn light-btn">Why is my address not whitelisted?</a>
                        </div>
                    </div> */}
                </div>
                <div className="deposit-data">
                    <DataTable
                        columns={columns}
                        data={externalWallets}
                        pagination
                        fixedHeader
                        persistTableHead
                        theme='solarized'
                    />
                </div>
            </div>

            <Modal className="modal-wrapper modal-six-wrapper withdraw-crypo-modal" show={show} onHide={handleClose}>
                <Modal.Header className='modal-main-heading' closeButton>
                    <div className="modal-main-heading-content">
                        <h3 className="modal-title" id="exampleModalLabel">Address Details</h3>
                        <span className="header-border"></span>
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <div className="withdrawal-content-area">
                        <div className="withdrawal-content border-pink">
                            <span className="text-dark">Address Added</span>
                            <p className="p2">2022-01-17 10:24</p>
                        </div>
                        <div className="withdrawal-content border-green">
                            <span className="text-dark">System Processing</span>
                            <p className="p2">2022-01-17 10:26</p>
                        </div>
                        <div className="withdrawal-content border-blue">
                            <span className="text-dark">Completed</span>
                            <p className="mb-0 p2">2022-01-17 10:24</p>
                            <p>Please note that you will receive a email once it is completed.</p>
                        </div>
                    </div>
                    <div className="modal-six-bottom-area">
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Status</p>
                            </div>
                            <div className="deposit-details-content-info details-dot d-flex align-items-center">
                                <span className="m-0 text-dark"> {viewWallet.status ? "Completed" : "Pending"}</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Date</p>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <span className="m-0 text-dark"> {viewWallet.createdAt}</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Wallet type</p>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <span className="m-0 text-dark">Withdraw wallet</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Coin</p>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <figure className="deposit-logo mb-0">
                                    <img src={require(`../../assets/images/${viewWallet.symbol ? viewWallet.symbol : "BTC"}.png`).default} alt={viewWallet.name} className="img-fluid" />
                                </figure>
                                <span className="m-0 text-dark"> {viewWallet.symbol}</span>
                            </div>
                        </div>
                        <div className="deposit-details d-flex justify-content-between align-items-center">
                            <div className="deposit-details-content">
                                <p className="m-0 p2">Network</p>
                            </div>
                            <div className="deposit-details-content-info d-flex align-items-center">
                                <span className="m-0 text-dark"> {viewWallet.symbol}</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default Addresses