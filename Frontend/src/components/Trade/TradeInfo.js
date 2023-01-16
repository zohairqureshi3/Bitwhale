import React, { useState, useEffect } from "react";
import { Container, Row, Tabs, Tab, InputGroup, FormControl, Table, Form, Modal } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom'
import "react-rangeslider/lib/index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'
import Graph from "./Graph";
import axios from "axios";
import RegisterLogin from "./RegisterLogin";
import { useDispatch, useSelector } from "react-redux";
import { getCurrency } from '../../redux/currencies/currencyActions';
import { addLeverageOrder, clearLeverageOrder, getLeverageOrders, getUserLeverageOrders, stopLeverageOrder } from "../../redux/leverageOrder/leverageOrderActions";
import Swal from 'sweetalert2';
import GetAccountData from "../shared/GetAccountData";
import FullPageLoader from "../FullPageLoader/fullPageLoader";
import { getAccount } from "../../redux/account/accountActions";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const TradeInfo = () => {

  const token = localStorage.getItem('uToken');
  const coins = ['BTCUSDT', 'XRPUSDT', 'ETHBTC', 'ETHUSDT', 'XRPETH', 'XRPBTC']
  const [crSymbol, setCrSymbol] = useState('ETHUSDT');
  const [percentage, setPercentage] = useState(0 + "%");
  const [coinAmount, setCoinAmount] = useState(0);
  const [innitialRate, setInnitialRate] = useState(0);
  const [rate, setRate] = useState(0);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [avbl, setAvbl] = useState(0);
  const [primaryCoin, setPrimaryCoin] = useState('ETH');
  const [secondaryCoin, setSecondaryCoin] = useState('USDT');
  const [toggle, setToggle] = useState(true); // 1=buy, 0=sell
  const [market, setMarket] = useState(false); // 1=market 0=limit
  const [TPSL, setTPSL] = useState(false);
  const [TP, setTP] = useState('');
  const [SL, setSL] = useState('');
  const [leverage, setLeverage] = useState(20);
  const [margin, setMargin] = useState(1); // 0=cross, 1=isolated
  const [showLeverage, setShowLeverage] = useState(false);
  const [showMargin, setShowMargin] = useState(false);
  const [loader, setLoader] = useState(false);

  const history = useNavigate()
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.user?._id);
  const currencyData = useSelector((state) => state.currency?.currencies?.allCurrencies);
  const amounts = useSelector((state) => state.accounts?.account?.amounts);
  const success = useSelector((state) => state.LeverageOrders?.success);
  const marketOrders = useSelector((state) => state.LeverageOrders?.orders?.orders?.filter(row => row.fromCurrency._id == primaryCoin?._id && row.toCurrency._id == secondaryCoin?._id).filter(row => row.marketOrder == 1));
  const limitOrders = useSelector((state) => state.LeverageOrders?.orders?.orders?.filter(row => row.fromCurrency._id == primaryCoin?._id && row.toCurrency._id == secondaryCoin?._id).filter(row => !row.marketOrder));
  const userOrders = useSelector((state) => state.LeverageOrders?.userOrders?.userOrders?.filter(row => row.fromCurrency._id == primaryCoin?._id && row.toCurrency._id == secondaryCoin?._id))
  // const userOrders = useSelector((state) => state.LeverageOrders?.userOrders?.userOrders)

  const handleCloseLeverage = () => setShowLeverage(false);
  const handleShowLeverage = () => setShowLeverage(true);
  const handleCloseMargin = () => setShowMargin(false);
  const handleShowMargin = () => setShowMargin(true);

  useEffect(() => {
    dispatch(getCurrency());
    if (userId)
      dispatch(getUserLeverageOrders(userId));
  }, [userId])

  useEffect(() => {
    dispatch(getLeverageOrders());
    if (success) {
      setLoader(false)
      dispatch(clearLeverageOrder());
      Swal.fire({
        title: 'Success',
        text: "Trade Order created successfully.",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
      if (userId)
        dispatch(getAccount(userId));
      setTPSL(false);
      setTP('');
      setSL('');
      setCoinAmount(0)
      setPercentage(0 + "%")
      setLeverage(25)
      setMargin(1)
    }
  }, [success])

  useEffect(async () => {
    await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${primaryCoin.symbol}&tsyms=USDT,ETH,XRP,BTC&api_key=6f8e04fc1a0c524747940ce7332edd14bfbacac3ef0d10c5c9dcbe34c8ef9913`)
      .then((res) => {
        setExchangeRates(res.data)
        if ((exchangeRates && exchangeRates.length) || rate != 0) {
          setInnitialRate(res.data[secondaryCoin.symbol])
        }
      })
      .catch((error) => {
      });
  }, [rate])

  useEffect(() => {
    if (currencyData) {
      let parseUriSegment = window.location.pathname.split("/");
      if (parseUriSegment[2] && coins.includes(parseUriSegment[2])) {
        setCrSymbol(parseUriSegment[2])
        console.log(parseUriSegment[2])
        let a = parseUriSegment[2].substring(0, 3)
        let prim = currencyData?.find(row => row.symbol == a)
        setPrimaryCoin(prim)
        if (amounts)
          setAvbl(amounts?.find(row => row.currencyId == prim?._id)?.amount)
        let b = parseUriSegment[2].substring(3, parseUriSegment[2].length)
        let sec = currencyData.find(row => row.symbol == b)
        setSecondaryCoin(sec)
      }
      else {
        setCrSymbol('ETHUSDT')
        let prim = currencyData?.find(row => row.symbol == 'ETH')
        setPrimaryCoin(prim)
        if (amounts)
          setAvbl(amounts?.find(row => row.currencyId == prim?._id)?.amount)
        let sec = currencyData?.find(row => row.symbol == 'USDT')
        setSecondaryCoin(sec)
      }
    }
  }, [history, currencyData, amounts])

  const handleSubmit = async () => {
    await setRate(!rate);
    if (coinAmount == 0 || innitialRate == 0) {
      Swal.fire({
        // title: 'Success',
        text: "Amount and trade Start Price cannot be 0. Please enter a number",
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
    } else {
      let data = {
        userId: userId,
        fromCurrency: primaryCoin?._id,
        toCurrency: secondaryCoin?._id,
        TPSL: TPSL,
        takeProfitPrice: TP,
        stopLossPrice: SL,
        tradeType: toggle,
        leverage: leverage,
        marginType: margin,
        tradeStartPrice: innitialRate,
        userInvestedAmount: coinAmount,
        marketOrder: market
      }
      dispatch(addLeverageOrder(data));
      setLoader(true)
    }
  }

  const handleLimit = (val) => {
    if (avbl) {
      var validNumber = new RegExp(/^\d*\.?\d*$/);
      if (!val.toString().match(validNumber) || parseFloat(val) > parseFloat(avbl)) {
        Swal.fire({
          // title: 'Success',
          text: "Invalid number entered. Please enter a valid number",
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'OK',
        })
        setCoinAmount(0)
        setPercentage(0 + "%")
      }
    }
  }

  const handlePercentLimit = (val, per = 0) => {
    if (avbl) {
      var validNumber = new RegExp(/^\d*\.?\d*$/);
      if (!val.toString().match(validNumber) || parseFloat(val) > parseFloat(100) || parseFloat(val) < parseFloat(0)) {
        Swal.fire({
          // title: 'Success',
          text: "Invalid number entered. Please enter a valid number",
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'OK',
        })
        if (per) {
          setCoinAmount(0)
          setPercentage(0 + "%")
        }
        else
          setLeverage(20)
      }
    }
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

  const ordertabs = (
    <div className="buy-tabs">
      <div className="d-flex flex-row justify-content-evenly text-white mb-2">
        <div className={!market ? "text-yellow point" : "point"} onClick={() => setMarket(0)}>Limit</div>
        <div className={market ? "text-yellow point" : "point"} onClick={() => setMarket(1)}>Market</div>
      </div>
      {avbl ? <p>Avbl {avbl} {primaryCoin.symbol}</p> : null}

      {!market ?
        <InputGroup className="mb-4">
          <FormControl
            placeholder="Rate"
            aria-label=""
            aria-describedby=""
            value={innitialRate}
            onChange={(e) => setInnitialRate(e.target.value)}
          />
          <InputGroup.Text className="text-yellow point" onClick={() => { setRate(!rate); }}>
            Last
          </InputGroup.Text>
          <InputGroup.Text id="basic-addon2">
            {secondaryCoin.symbol}
          </InputGroup.Text>
        </InputGroup>
        : null
      }

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Percentage"
          min="0"
          max="100"
          value={percentage}
          onChange={(e) => { let val = e.target.value.replace('%', ''); setPercentage(val + "%"); if (avbl) { setCoinAmount(avbl * (val / 100)); } }}
          onBlur={(e) => handlePercentLimit(e.target.value)}
        />
        <FormControl
          type="number"
          step="0.1"
          placeholder="Price"
          min="0.1"
          max={avbl ? avbl : 10000000}
          value={coinAmount}
          onChange={(e) => { let val = e.target.value; setCoinAmount(val); if (avbl) { setPercentage(((val * 100) / avbl) + "%"); } }}
          onBlur={(e) => handleLimit(e.target.value)}
        />
        <InputGroup.Text id="basic-addon2">
          {primaryCoin.symbol}
        </InputGroup.Text>
      </InputGroup>

      <Form.Range defaultValue={0} value={percentage.replace('%', '')} onChange={(e) => { let val = e.target.value; setPercentage(val + "%"); if (avbl) { setCoinAmount(avbl * (val / 100)); } }} />
      {toggle ?
        <InputGroup className="mb-2 text-white d-flex align-items-center" >
          <div style={{ paddingTop: "2px" }}><input type="checkbox" checked={TPSL} onChange={() => setTPSL(!TPSL)} /></div> <p style={{ margin: "0", paddingLeft: "5px" }}>TP/SL</p>
        </InputGroup>
        : null
      }

      {TPSL ?
        <>
          <InputGroup className="mb-3">
            <FormControl
              type="number"
              placeholder="Take Profit"
              min="0"
              value={TP}
              onChange={(e) => setTP(e.target.value)}
            />
            <InputGroup.Text id="basic-addon2">
              {secondaryCoin.symbol}
            </InputGroup.Text>
          </InputGroup>

          <InputGroup className="mb-3">
            <FormControl
              type="number"
              placeholder="Stop Loss"
              min="0"
              value={SL}
              onChange={(e) => setSL(e.target.value)}
            />
            <InputGroup.Text id="basic-addon2">
              {secondaryCoin.symbol}
            </InputGroup.Text>
          </InputGroup>
        </>
        : null
      }

      <RegisterLogin submit={() => handleSubmit()} disabled={loader} />
    </div>
  )

  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  return (
    <section className="trade-page">
      {loader ? <FullPageLoader /> : null}
      {userId ? <GetAccountData /> : null}
      <div className="bar">
        <div className="user-screen">
          <div className="d-flex justify-content-between align-items-center flex-md-row flex-column">
            <div className="d-flex align-items-center mb-lg-0 mb-3">
              <i className="fa fa-angle-left me-lg-4 me-3 left-angle"></i>
              <h3 className="mb-0 text-light">Trade</h3>
            </div>
          </div>
        </div>
      </div>
      <Container fluid>
        <Row>
          <div className="col-xl-8">
            <div className="graph-and-table-wrapper">
              <Graph />
              <div className="graph-table" style={{ paddingTop: "20px" }}>
                <Tabs defaultActiveKey="assets" className="mb-3">
                  <Tab eventKey="assets" title="Assets">
                    <Table responsive className="trade-table">
                      <thead>
                        <tr>
                          <th scope="col">Symbol</th>
                          <th scope="col">Coin</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amounts && amounts.length ?
                          amounts.map((coin, index) =>
                            <>
                              {currencyData?.find(row => row._id == coin.currencyId)?.name ?
                                <tr key={index}>
                                  <th scope="row">
                                    <div className="currency-info-logo-popup">
                                      {currencyData?.find(row => row._id == coin.currencyId)?.symbol}
                                    </div>
                                  </th>
                                  <td>{currencyData?.find(row => row._id == coin.currencyId)?.name}</td>
                                  <td>{coin.amount}</td>
                                </tr>
                                : null
                              }
                            </>
                          ) :
                          <td colSpan="3" >
                            {token ?
                              "Empty"
                              :
                              <div className="graph-table-btns buy-tabs">
                                <Link to="/register">
                                  <button type="button" className="mb-2 register-now">
                                    Register Now
                                  </button>
                                </Link>
                                <Link to="/login">
                                  <button type="button" className="login-now">
                                    Log In
                                  </button>
                                </Link>
                              </div>
                            }
                          </td>
                        }
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="open" title="Open Orders">
                    <Table responsive className="trade-table">
                      <thead>
                        <tr>
                          <th scope="col">Trade Type</th>
                          <th scope="col">Trade Start Price</th>
                          <th scope="col">Margin Type</th>
                          <th scope="col">Coins Invested</th>
                          <th scope="col">Leverage Taken</th>
                          <th scope="col">Total Coins</th>
                          <th scope="col">Take Profit / Stop Loss</th>
                          <th scope="col">Status</th>
                          <th scope="col">Order Placed</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrders && userOrders.length ?
                          userOrders.filter(row => row.status != 2 && row.status != 3).map((order, index) =>
                            <>
                              <tr key={index}>
                                <th scope="row">{order.tradeType == 1 ? "Buy" : "Sell"}</th>
                                <td>{order.tradeStartPrice}</td>
                                <td>{order.marginType == 0 ? "Cross" : "Isolated"}</td>
                                <td>{(order.userInvestedAmount)}</td>
                                <td>{order.leverage}</td>
                                <td>{(order.leverage * order.userInvestedAmount)}</td>
                                <td>{order.tpsl ? "ON" : "OFF"}</td>
                                {/* // 0=Created, 1=Processing, 2=Completed, 3=Stopped */}
                                <td>{order.status == 1 ? "Processing" : order.status == 2 ? "Completed" : order.status == 3 ? "Stopped" : "Created"}</td>
                                <td>{formatDate(new Date(order.createdAt))}</td>
                                <td>
                                  <button type="button" className="btn btn-sm green-btn" onClick={async () => { dispatch(stopLeverageOrder(order._id)); await wait(5000); window.location.reload() }}>Stop</button>
                                </td>
                              </tr>
                            </>
                          ) :
                          <td colSpan="10" >
                            {token ?
                              "Empty"
                              :
                              <div className="graph-table-btns buy-tabs">
                                <Link to="/register">
                                  <button type="button" className="mb-2 register-now">
                                    Register Now
                                  </button>
                                </Link>
                                <Link to="/login">
                                  <button type="button" className="login-now">
                                    Log In
                                  </button>
                                </Link>
                              </div>
                            }
                          </td>
                        }
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="history" title="Order History">
                    <Table responsive className="trade-table">
                      <thead>
                        <tr>
                          <th scope="col">Trade Type</th>
                          <th scope="col">Trade Start Price</th>
                          <th scope="col">Margin Type</th>
                          <th scope="col">Coins Invested</th>
                          <th scope="col">Leverage Taken</th>
                          <th scope="col">Total Coins</th>
                          <th scope="col">Take Profit / Stop Loss</th>
                          <th scope="col">Status</th>
                          <th scope="col">Order Placed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrders && userOrders.length ?
                          userOrders.filter(row => row.status == 2 || row.status == 3).map((order, index) =>
                            <>
                              <tr key={index}>
                                <th scope="row">{order.tradeType == 1 ? "Buy" : "Sell"}</th>
                                <td>{order.tradeStartPrice}</td>
                                <td>{order.marginType == 1 ? "Cross" : "Isolated"}</td>
                                <td>{(order.userInvestedAmount)}</td>
                                <td>{order.leverage}</td>
                                <td>{(order.leverage * order.userInvestedAmount)}</td>
                                <td>{order.tpsl ? "ON" : "OFF"}</td>
                                {/* // 0=Created, 1=Processing, 2=Completed, 3=Stopped */}
                                <td>{order.status == 1 ? "Processing" : order.status == 2 ? "Completed" : order.status == 3 ? "Stopped" : "Created"}</td>
                                <td>{formatDate(new Date(order.createdAt))}</td>
                              </tr>
                            </>
                          ) :
                          <td colSpan="9" >
                            {token ?
                              "Empty"
                              :
                              <div className="graph-table-btns buy-tabs">
                                <Link to="/register">
                                  <button type="button" className="mb-2 register-now">
                                    Register Now
                                  </button>
                                </Link>
                                <Link to="/login">
                                  <button type="button" className="login-now">
                                    Log In
                                  </button>
                                </Link>
                              </div>
                            }
                          </td>
                        }
                      </tbody>
                    </Table>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="col-xl-4" style={{ zIndex: "99999" }}>
            <div className="row">

              <div className="col-sm-6 order-book-market p-0">
                <div className="order-book-market-wrapper">
                  <Tabs defaultActiveKey="order-book" id="uncontrolled-tab-example" className="mb-2">
                    <Tab eventKey="order-book" title="Order Book">
                      <div className="d-flex text-white">
                        <h3 className="w-100 text-center" style={{ background: "#070860", paddingTop: "2px" }}>SELL ORDERS</h3>
                      </div>
                      <Table responsive className="trade-table">
                        <thead>
                          <tr>
                            <th>Price({secondaryCoin?.symbol})</th>
                            <th>Amount({primaryCoin?.symbol})</th>
                            <th>Sum({primaryCoin?.symbol})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {limitOrders && limitOrders.filter(row => !row.tradeType).length ?
                            limitOrders && limitOrders.filter(row => !row.tradeType).slice(0, 4).map(order =>
                              <tr>
                                <td className="color-red">{order.tradeStartPrice}</td>
                                <td>{(order.userInvestedAmount * order.leverage).toFixed(4)}</td>
                                <td>{(order.userInvestedAmount * order.leverage).toFixed(4)}</td>
                              </tr>
                            ) : <td colSpan='3'>"No orders found"</td>
                          }
                        </tbody>
                      </Table>
                      <div className="d-flex text-white">
                        <h3 className="w-100 text-center" style={{ background: "#070860", paddingTop: "2px" }}>BUY ORDERS</h3>
                      </div>
                      <div className="d-flex">
                        <h3 className="color-red">{exchangeRates[secondaryCoin.symbol]} {secondaryCoin.symbol} <FontAwesomeIcon icon={faArrowUp} /></h3><h3 style={{ color: "#fff" }} className="ms-4">{exchangeRates[primaryCoin.symbol]}</h3>
                      </div>
                      <Table responsive className="trade-table">
                        <thead>
                          <tr>
                            <th>Price({secondaryCoin?.symbol})</th>
                            <th>Amount({primaryCoin?.symbol})</th>
                            <th>Sum({primaryCoin?.symbol})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {limitOrders && limitOrders.filter(row => row.tradeType).length ?
                            limitOrders && limitOrders.filter(row => row.tradeType).slice(0, 4).map(order =>
                              <tr>
                                <td className="color-red">{order.tradeStartPrice}</td>
                                <td>{(order.userInvestedAmount * order.leverage).toFixed(4)}</td>
                                <td>{(order.userInvestedAmount * order.leverage).toFixed(4)}</td>
                              </tr>
                            ) : <td colSpan='3'>"No orders found"</td>
                          }
                        </tbody>
                      </Table>
                    </Tab>
                    <Tab eventKey="market-traders" title="Market Traders">
                      <Table responsive className="trade-table">
                        <thead>
                          <tr>
                            <th>Time</th>
                            <th>Price({secondaryCoin?.symbol})</th>
                            <th>Amount({primaryCoin?.symbol})</th>
                          </tr>
                        </thead>
                        <tbody>

                          {marketOrders && marketOrders.length ?
                            marketOrders && marketOrders.map(order =>
                              <tr>
                                <td>{formatDate(new Date(order.createdAt))}</td>
                                <td className="color-red">{(parseFloat(order.tradeStartPrice).toFixed(4))}</td>
                                <td>{(order.userInvestedAmount * order.leverage).toFixed(4)}</td>
                              </tr>
                            )
                            : <td colSpan='3'>"No orders found"</td>
                          }

                        </tbody>
                      </Table>
                    </Tab>
                  </Tabs>
                </div>
              </div>

              <div className="col-sm-6 buy-and-sell">
                <div className="d-flex flex-row justify-content-between text-white mb-2 margin-x">
                  <div className="coin-btn py-1 px-2" onClick={() => handleShowLeverage()}> {leverage}x </div>
                  <div className="coin-btn py-1 px-2" onClick={() => handleShowMargin()}> Margin </div>
                </div>
                <div className="buy-sell-tabs">
                  <div className="d-flex text-white mb-2 buy-sell">
                    <div className={toggle ? "text-yellow point" : "point"} onClick={() => { setToggle(1) }}>BUY</div>
                    <div className={!toggle ? "text-yellow point" : "point"} onClick={() => { setToggle(0) }}>SELL</div>
                  </div>
                  {ordertabs}
                </div>



              </div>
            </div>
          </div>
        </Row >
      </Container >

      <Modal Modal className='modal-wrapper modal-wrapper-width' show={showLeverage} onHide={handleCloseLeverage} >
        <Modal.Header className='modal-main-heading' closeButton>
          <div className="modal-main-heading-content">
            <h5 className="modal-title" id="exampleModalLabel">Set Leverage</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Leverage"
              min="0"
              max="100"
              value={leverage}
              onChange={(e) => { let val = e.target.value; setLeverage(val); }}
              onBlur={(e) => handlePercentLimit(e.target.value, 1)}
            />
            <InputGroup.Text id="basic-addon2"> X </InputGroup.Text>
          </InputGroup>
          <Form.Range defaultValue={0} value={leverage} onChange={(e) => { let val = e.target.value; setLeverage(val); }} />
        </Modal.Body>
      </Modal >

      <Modal className='modal-wrapper modal-wrapper-width' show={showMargin} onHide={handleCloseMargin}>
        <Modal.Header className='modal-main-heading' closeButton>
          <div className="modal-main-heading-content">
            <h5 className="modal-title" id="exampleModalLabel">Set Margin</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-row justify-content-evenly">
            <div> <input type="radio" value="0" name="margin" checked={margin == 0 ? 1 : 0} onClick={() => setMargin(0)} /> <label>Cross</label> </div>
            <div> <input type="radio" value="1" name="margin" checked={margin == 1 ? 1 : 0} onClick={() => setMargin(1)} /> <label>Isolated</label> </div>
          </div>
        </Modal.Body>
      </Modal>

    </section >
  );
};

export default TradeInfo;


// <Tab eventKey="profile" title="SELL">
//   <div className="buy-tabs">
//     <Tabs
//       defaultActiveKey="home"
//       id="uncontrolled-tab-example"
//       className="mb-3"
//     >
//       <Tab eventKey="home" title="Limit">
//         <p>Abvl 0.0000</p>
//         <InputGroup className="mb-3">
//           <FormControl
//             placeholder="Price"
//             aria-label=""
//             aria-describedby=""
//           />
//           <InputGroup.Text id="basic-addon2">
//             USTD4
//           </InputGroup.Text>
//         </InputGroup>

//         <InputGroup className="mb-4">
//           <FormControl
//             placeholder="Amount"
//             aria-label=""
//             aria-describedby=""
//           />
//           <InputGroup.Text id="basic-addon2">
//             AWVX4
//           </InputGroup.Text>
//         </InputGroup>

//         <Form.Range />
//         <RegisterLogin />
//       </Tab>
//       <Tab eventKey="profile" title="Market">
//         <p>Abvl 0.0000</p>
//         <InputGroup className="mb-3">
//           <FormControl
//             placeholder="Price"
//             aria-label=""
//             aria-describedby=""
//           />
//           <InputGroup.Text id="basic-addon2">
//             USTD5
//           </InputGroup.Text>
//         </InputGroup>

//         <InputGroup className="mb-4">
//           <FormControl
//             placeholder="Amount"
//             aria-label=""
//             aria-describedby=""
//           />
//           <InputGroup.Text id="basic-addon2">
//             AWVX5
//           </InputGroup.Text>
//         </InputGroup>

//         <Form.Range />
//         <RegisterLogin />
//       </Tab>
//       <Tab eventKey="contact" title="Stop-limit">
//         <p>Abvl 0.0000</p>
//         <InputGroup className="mb-3">
//           <FormControl
//             placeholder="Price"
//             aria-label=""
//             aria-describedby=""
//           />
//           <InputGroup.Text id="basic-addon2">
//             USTD6
//           </InputGroup.Text>
//         </InputGroup>

//         <InputGroup className="mb-4">
//           <FormControl
//             placeholder="Amount"
//             aria-label=""
//             aria-describedby=""
//           />
//           <InputGroup.Text id="basic-addon2">
//             AWVX6
//           </InputGroup.Text>
//         </InputGroup>

//         <Form.Range />
//         <RegisterLogin />
//       </Tab>
//     </Tabs>
//   </div>
// </Tab>