import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FullPageLoader from "../FullPageLoader/fullPageLoader";
import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.SOCKET_URL

const MarketInfo = () => {

  const [currencies, setCurrencies] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setCurrencies(data);
    });
    getCurrencies();
  }, [])
  console.log("MarketInfo: ", currencies)

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
    <section className="market">
      <Container fluid className="custom-box">
        <h3>Market Futures</h3>
        {loader ? <FullPageLoader /> :
          <div className="responsive-table table-responsive">
            <table className="table deposit-table convert-history-table">
              <thead className="deposit-table-header">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">24h Change</th>
                  <th scope="col">24h High / 24h Low</th>
                  <th scope="col">24h Volume</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currencies?.length > 0 && currencies.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th className="d-flex align-items-center" scope="row">
                        {/* <Image style={{ marginRight: "10px" }} src={Binance} fluid alt="" />{" "} */}
                        {item.symbol}
                      </th>
                      <td>$ {item.askPrice}</td>
                      <td className={item.priceChangePercent < 0 ? "dark-red" : "dark-green"}>{item.priceChangePercent}%</td>
                      <td>{item.highPrice} / {item.lowPrice}</td>
                      <td>{item.volume}</td>
                      <td>
                        <Link to={'/trade/' + item.symbol} className="green-btn text-decoration-none">Trade</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        }
      </Container>
    </section>
  );
};

export default MarketInfo;
