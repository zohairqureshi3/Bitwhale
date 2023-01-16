import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Image, Row } from 'react-bootstrap';
import Binance from '../../assets/images/binance.png';
import BTC from '../../assets/images/btc.svg';
import ETH from '../../assets/images/eth.svg';
import USDT from '../../assets/images/usdt.svg';
import XRP from '../../assets/images/xrp.svg';
import FullPageLoader from "../FullPageLoader/fullPageLoader";

import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.SOCKET_URL

const CryptoFuturesPrices = () => {

    const [currencies, setCurrencies] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        console.log(ENDPOINT)
        socket.on("FromAPI", data => {
            setCurrencies(data);
            console.log("Future data:", data)
        });
        getCurrencies();
    }, [])

    const getCurrencies = async () => {
        let prices = [];
        let symbols = ['BTCUSDT', 'XRPUSDT', 'ETHBTC', 'ETHUSDT', 'XRPETH', 'XRPBTC']
        for (let i = 0; i < symbols.length; i++) {
            await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbols[i]}`).then((res) => {
                prices.push(res.data)
            })
        }
        setCurrencies(prices);
        setLoader(false)
    }

    return (
        <section className='crypto-futures-prices'>
            <Container fluid className="custom-box">
                <h2>Crypto Futures Last Prices (24h Volume)</h2>
                {loader ? <FullPageLoader /> :
                    <Row>
                        <Col md={6}>
                            <div className='crypto-future-price-wrapper'>
                                <div className='crypto-future-price'>
                                    <Image src={USDT} alt="" fluid />
                                    <div>
                                        <h3>COIN-M Futures</h3>
                                    </div>
                                </div>
                                <div className="responsive-table table-responsive">
                                    <table className="table deposit-table convert-history-table">
                                        <thead className="deposit-table-header">
                                            <tr>
                                                <th scope="col">Symbols</th>
                                                <th scope="col">Last Price</th>
                                                <th scope="col">24h Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currencies?.length > 0 && currencies.map((item, index) => {
                                                return (
                                                    item?.symbol === 'ETHBTC' || item?.symbol === 'XRPETH' || item?.symbol === 'XRPBTC' ?
                                                        <tr key={index}>
                                                            <td>{item.symbol} Perpetual</td>
                                                            <td>{item.askPrice}</td>
                                                            <td className={item.priceChangePercent < 0 ? "dark-red" : "dark-green"}>{item.priceChangePercent}%</td>
                                                        </tr>
                                                        : ""
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='crypto-future-price-wrapper'>
                                <div className='crypto-future-price'>
                                    <Image src={ETH} alt="" fluid />
                                    <div>
                                        <h3>USDⓈ-M Futures</h3>
                                    </div>
                                </div>
                                <div className="responsive-table table-responsive">
                                    <table className="table deposit-table convert-history-table">
                                        <thead className="deposit-table-header">
                                            <tr>
                                                <th scope="col">Symbols</th>
                                                <th scope="col">Last Price</th>
                                                <th scope="col">24h Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currencies?.length > 0 && currencies.map((item, index) => {
                                                return (
                                                    item?.symbol === 'BTCUSDT' || item?.symbol === 'XRPUSDT' || item?.symbol === 'ETHUSDT' ?
                                                        <tr key={index}>
                                                            <td>{item.symbol} Perpetual</td>
                                                            <td>{item.askPrice}</td>
                                                            <td className={item.priceChangePercent < 0 ? "dark-red" : "dark-green"}>{item.priceChangePercent}%</td>
                                                        </tr>
                                                        : ""
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='crypto-future-price-wrapper'>
                                <div className='crypto-future-price'>
                                    <Image src={BTC} alt="" fluid />
                                    <div>
                                        <h3>BitWhale Leveraged Tokens</h3>
                                    </div>
                                </div>
                                <div className="responsive-table table-responsive">
                                    <table className="table deposit-table convert-history-table">
                                        <thead className="deposit-table-header">
                                            <tr>
                                                <th scope="col">Symbols</th>
                                                <th scope="col">Last Price</th>
                                                <th scope="col">24h Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currencies?.length > 0 && currencies.map((item, index) => {
                                                return (
                                                    item?.symbol === 'BTCUSDT' || item?.symbol === 'XRPUSDT' || item?.symbol === 'ETHUSDT' ?
                                                        <tr key={index}>
                                                            <td>{item.symbol} Perpetual</td>
                                                            <td>{item.askPrice}</td>
                                                            <td className={item.priceChangePercent < 0 ? "dark-red" : "dark-green"}>{item.priceChangePercent}%</td>
                                                        </tr>
                                                        : ""
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className='crypto-future-price-wrapper'>
                                <div className='crypto-future-price'>
                                    <Image src={XRP} alt="" fluid />
                                    <div>
                                        <h3>BitWhale Options</h3>
                                    </div>
                                </div>
                                <div className="responsive-table table-responsive">
                                    <table className="table deposit-table convert-history-table">
                                        <thead className="deposit-table-header">
                                            <tr>
                                                <th scope="col">Symbols</th>
                                                <th scope="col">Last Price</th>
                                                <th scope="col">24h Change</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currencies?.length > 0 && currencies.map((item, index) => {
                                                return (
                                                    item?.symbol === 'ETHBTC' || item?.symbol === 'XRPETH' || item?.symbol === 'XRPBTC' ?
                                                        <tr key={index}>
                                                            <td>{item.symbol} Perpetual</td>
                                                            <td>{item.askPrice}</td>
                                                            <td className={item.priceChangePercent < 0 ? "dark-red" : "dark-green"}>{item.priceChangePercent}%</td>
                                                        </tr>
                                                        : ""
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
            </Container>
        </section>
    )
}

export default CryptoFuturesPrices