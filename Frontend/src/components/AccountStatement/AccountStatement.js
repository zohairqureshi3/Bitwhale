import React, { useEffect } from 'react';
import SideBar from '../SideBar/SideBar';
import ETH from '../../assets/images/ETH.png';
import CNF from '../../assets/images/CoinNotFound.png';
import XRP from '../../assets/images/XRP.png';
import USDT from '../../assets/images/USDT.png';
import BTC from '../../assets/images/BTC.png';
import { getCurrency } from '../../redux/currencies/currencyActions';
import { useDispatch, useSelector } from "react-redux";
import GetAccountData from '../shared/GetAccountData';

const AccountStatement = () => {

    const dispatch = useDispatch();
    const currencyData = useSelector((state) => state.currency?.currencies?.allCurrencies);
    const AccountData = useSelector((state) => state.accounts?.account);
    const amounts = useSelector((state) => state.accounts?.account?.amounts);

    useEffect(() => {
        dispatch(getCurrency());
    }, []);

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
        <>
            <section className='account-statement overview section-padding transection-history-section'>
                <GetAccountData />
                <div className="row">
                    <SideBar />

                    <div className="col-lg-10">
                        <div className="transaction-history fade-color">
                            <div className="transaction-history-heading-section d-flex justify-content-between">
                                <h3>Account Statement</h3>
                                <div className="share-link">
                                    {/* <div className="share-link">
                                    <a href="#" className="share-link-content d-flex align-items-center">
                                        <FontAwesomeIcon icon={faShareSquare} />
                                        <p className="m-0">Generate all statements</p>
                                    </a>
                                </div>
                            </div>
                                </div> */}
                                </div>
                            </div>

                            <div className="responsive-table table-responsive">
                                <table className="table table-hover deposit-table">
                                    <thead className="deposit-table-header">
                                        <tr>
                                            <th scope="col">Symbol</th>
                                            <th scope="col">Coin</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {amounts && amounts.length ? amounts.map((coin, index) =>
                                            <>
                                                {currencyData?.find(row => row._id == coin.currencyId)?.name ?
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            <div className="currency-info-logo-popup">
                                                                <img src={getCoinImg(currencyData?.find(row => row._id == coin.currencyId)?.symbol)} alt="" className="img-fluid" />
                                                                {" "} {currencyData?.find(row => row._id == coin.currencyId)?.symbol}
                                                            </div>
                                                        </th>
                                                        <td>{currencyData?.find(row => row._id == coin.currencyId)?.name}</td>
                                                        <td>{coin.amount}</td>
                                                    </tr>
                                                    : null
                                                }
                                            </>
                                        ) : "Empty Wallet"
                                        }

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccountStatement