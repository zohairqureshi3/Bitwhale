import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Image,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import FullPageLoader from "../FullPageLoader/fullPageLoader";
import Binance from "../../assets/images/binance.png";

const MarketInfo = () => {

  const [currencies, setCurrencies] = useState(null);
  const [loader, setLoader] = useState(true);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
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

  console.log(currencies, "cur");

  return (
    <section className="market">
      <Container fluid className="custom-box">
        <h3>Market Futures</h3>

        <div className="market-tabs-table">
          {/* <Form className="d-flex market-search-bar">
            <FormControl
              type="search"
              placeholder="Search Coin Name"
              className="me-2"
              aria-label="Search"
            />
          </Form> */}

          <Tabs defaultActiveKey="future-markets" id="uncontrolled-tab-example" className="mb-5">

            {/* <Tab eventKey="all-cryptos" title="All Cryptos">
              <div className="responsive-table table-responsive">
                <table className="table table-hover deposit-table convert-history-table">
                  <thead className="deposit-table-header">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">24h Change</th>
                      <th scope="col">24h Volume</th>
                      <th scope="col">Market Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currencies?.length > 0 && currencies.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th className="d-flex align-items-center" scope="row">
                            <Image style={{ marginRight: "10px" }} src={Binance} fluid alt="" />{" "}
                            {item.symbol} <span style={{ marginLeft: "20px" }}>{item.symbol}</span>
                          </th>
                          <td>$ {item.askPrice}</td>
                          <td>{item.priceChangePercent}%</td>
                          <td>{item.volume}</td>
                          <td>${item.quoteVolume}</td>
                          <td>
                            <button style={{ marginRight: "20px" }} className="green-btn">Detail</button>
                            <button className="green-btn">Trade</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Tab> */}

            {/* <Tab eventKey="spot-markets" title="Spot Markets">
              <div className="responsive-table table-responsive">
                <table className="table table-hover deposit-table convert-history-table">
                  <thead className="deposit-table-header">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">24h Change</th>
                      <th scope="col">24h High / 24h Low</th>
                      <th scope="col">24h Volume</th>
                      <th scope="col">Market Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currencies?.length > 0 && currencies.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th className="d-flex align-items-center" scope="row">
                            <Image style={{ marginRight: "10px" }} src={Binance} fluid alt="" />{" "}
                            {item.symbol} <span style={{ marginLeft: "20px" }}>{item.symbol}</span>
                          </th>
                          <td>$ {item.askPrice}</td>
                          <td>{item.priceChangePercent}%</td>
                          <td>{item.highPrice} / {item.lowPrice}</td>
                          <td>{item.volume}</td>
                          <td>${item.quoteVolume}</td>
                          <td>
                            <button style={{ marginRight: "20px" }} className="green-btn">Detail</button>
                            <button className="green-btn">Trade</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Tab> */}
              {/* <Tab eventKey="future-markets">
                <div className="responsive-table table-responsive">
                  <table className="table table-hover deposit-table convert-history-table">
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
                              <Image style={{ marginRight: "10px" }} src={Binance} fluid alt="" />{" "}
                              {item.symbol}
                            </th>
                            <td>$ {item.askPrice}</td>
                            <td>{item.priceChangePercent}%</td>
                            <td>{item.highPrice} / {item.lowPrice}</td>
                            <td>{item.volume}</td>
                            <td>
                              <Link to={'/trade/' + item.symbol} className="green-btn">Trade</Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </Tab> */}
          </Tabs>
        </div>

        {loader ? <FullPageLoader /> :
          <div className="responsive-table table-responsive">
            <table className="table table-hover deposit-table convert-history-table">
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
                      <td>{item.priceChangePercent}%</td>
                      <td>{item.highPrice} / {item.lowPrice}</td>
                      <td>{item.volume}</td>
                      <td>
                        <Link to={'/trade/' + item.symbol} className="green-btn">Trade</Link>
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
