import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Binance from '../../assets/images/binance.png';
import MarketTrendImg from '../../assets/images/market-trend.svg';
import axios from "axios";
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { Link } from 'react-router-dom';

import socketIOClient from "socket.io-client";
const ENDPOINT = process.env.SOCKET_URL

const MarketTrend = () => {
    const [currencies, setCurrencies] = useState(null);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
          setCurrencies(data);
        });
        getCurrencies();
      }, [])
    console.log("Market-Trade: ", currencies)

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
        <section className="market-trend">
            <Container fluid className="custom-box">
                <div className="text-center bottom-space">
                    <h2 className="mb-0">Market Trend</h2>
                </div>
                <div className="trend-table">
                    <table className="table table-responsive table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Last Price</th>
                                <th scope="col">24h Change</th>
                                <th scope="col">24h Volume</th>
                                <th scope="col">markets</th>
                            </tr>
                        </thead>
                        {loader ? <FullPageLoader /> :
                            <tbody>
                                {currencies?.length > 0 && currencies.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">
                                                {/* <div className="d-flex align-items-center">
                                                    <figure className="mb-0">
                                                        <img src={Binance} alt="market-product" className="img-fluid" />
                                                    </figure>
                                                    <div className="product-text d-inline-flex flex-column">
                                                        <a className="product-title text-decoration-none">{item.symbol}</a>
                                                    </div>
                                                </div> */}
                                                <span>
                                                    <Link to={`/trade/${item.symbol}`} className="product-title text-decoration-none">{item.symbol}</Link>
                                                </span>
                                            </th>
                                            <td>$ {item.askPrice}</td>
                                            <td className={item.priceChangePercent < 0 ? "dark-red" : "dark-green"}>{item.priceChangePercent}%</td>
                                            <td>{item.volume}</td>
                                            <td>
                                                <Link to={`/trade/${item.symbol}`} className="green-btn text-decoration-none">Trade</Link>
                                            </td>
                                            {/* <td>
                                                    <figure className="mb-0">
                                                        <img src={MarketTrendImg} alt="market-trend" className="img-fluid" />
                                                    </figure>
                                                </td> */}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        }
                    </table>
                    {/* <div className="text-center button-view">
                        <a href="#" className="btn-view">view more markets</a>
                    </div> */}
                </div>
            </Container>
        </section>
    )
}

export default MarketTrend