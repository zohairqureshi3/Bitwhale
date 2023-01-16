import React, { useEffect, useState } from 'react';
import { Container, DropdownButton, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchange, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { getCurrency } from '../../redux/currencies/currencyActions';
import { toast } from 'react-toastify';
import axios from 'axios';
import { addInternalOrder } from '../../redux/internalOrder/internalOrderActions';
import Swal from 'sweetalert2';
import { getTransactionFee } from '../../redux/transactionFee/transactionFeeActions';
import { getAccount } from '../../redux/account/accountActions';

const Convert = () => {

  const [show, setShow] = useState(false);
  const [userCoin, setUserCoin] = useState({});
  const [exchangeCoin, setExchangeCoin] = useState({});
  const [amount, setAmount] = useState(0);
  const [exchangeAmount, setExchangeAmount] = useState(0);
  const [haveCoins, setHaveCoins] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [rate, setRate] = useState(0);
  const [problem, setProblem] = useState(false);

  const dispatch = useDispatch();
  const currencyData = useSelector((state) => state.currency?.currencies?.allCurrencies);
  const userId = useSelector((state) => state.user?.user?._id);
  const amounts = useSelector((state) => state.accounts?.account?.amounts);
  const success = useSelector((state) => state.internalOrders?.success);
  const transactionFee = useSelector((state) => state.transactionFee?.transactionFee?.fee);

  useEffect(() => {
    dispatch(getCurrency());
    if (userId)
      dispatch(getAccount(userId));
  }, [userId]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        // title: 'Success',
        text: "Order added successfully",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then((result) => {
        dispatch(getAccount(userId));
        setUserCoin({});
        setExchangeCoin({});
        setAmount(0);
        setExchangeAmount(0);
        setHaveCoins(0);
        setExchangeRate(0);
      })
    }
  }, [success])

  const userCoinChange = (coin) => {
    getFee(coin._id);
    setUserCoin(coin);
    setHaveCoins(amounts.find(row => row.currencyId == coin._id).amount);
    axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${coin.symbol}&tsyms=USDT,ETH,XRP,BTC&api_key=6f8e04fc1a0c524747940ce7332edd14bfbacac3ef0d10c5c9dcbe34c8ef9913`)
      .then((res) => {
        setExchangeRate(res.data)
      })
      .catch((error) => {
        setProblem(true)
      });
  }

  const handleLimit = (val) => {
    var validNumber = new RegExp(/^\d*\.?\d*$/);
    if (!val.toString().match(validNumber) || parseFloat(val) > parseFloat(haveCoins - transactionFee >= 0 ? haveCoins - transactionFee : 0)) {
      Swal.fire({
        // title: 'Success',
        text: "Invalid number entered. Please enter a valid number",
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
      setAmount(0)
      userAmountChange(0)
    }
  }

  const userAmountChange = (val) => {
    setAmount(val);
    if (exchangeCoin) {
      let a = exchangeCoin?.symbol;
      setRate(exchangeRate[a])
      setExchangeAmount((val - (val * (transactionFee / 100))) * exchangeRate[a])
    } else {
      setExchangeAmount(val)
    }
  }

  const handleConvert = (e) => {
    e.preventDefault();
    if (amount == 0) {
      Swal.fire({
        // title: 'Success',
        text: "Exchange Amount cannot be 0. Please enter a number",
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
    } else {
      let a = exchangeCoin?.symbol;
      let exRate = exchangeRate[a];

      let data = {
        userId: userId,
        fromCurrency: userCoin?._id,
        toCurrency: exchangeCoin?._id,
        conversionRate: exRate,
        fromAmount: amount + transactionFee,
        convertedAmount: exchangeAmount
      }
      dispatch(addInternalOrder(data));
    }
  }

  const getFee = (currency) => {
    let data = { currencyId: currency }
    dispatch(getTransactionFee(data));
  }

  const exchange = () => {
    let tempCoin = userCoin;
    userCoinChange(exchangeCoin);
    setRate(0)
    getFee(tempCoin._id);
    setExchangeCoin(tempCoin);
    setAmount(0);
    setExchangeAmount(0);
  }

  return (
    <>
      <section className="trade-crypto-feature">
        <Container fluid className="custom-box">
          <h4 style={{ color: "#fff", textAlign: "center" }}>Convert Currency</h4>
          <div className="convert-history-form">
            <div className="select-crypto w-100">
              <div className="d-flex justify-content-between align-items-center flex-md-row flex-column mb-3">
                <p className="p2 mb-md-0 mb-3 color-white">Amount</p>
              </div>
              <div className="coin-dropdown">
                <div className="dropdown mb-3 rcv-amount">
                  <button
                    className="btn coin-btn theme-border w-100 d-flex justify-content-between align-items-center"
                    type="button"
                  >
                    <span>
                    </span>
                    <input placeholder="Enter Amount to convert" type="number" step="0.1" min="0.1" max={haveCoins - transactionFee >= 0 ? haveCoins - transactionFee : 0} value={amount} onChange={(e) => userAmountChange(e.target.value)} onBlur={(e) => handleLimit(e.target.value)} />
                    <span className="d-flex align-items-center">
                      {userCoin && userCoin.symbol ?
                        <p className="p2 mb-0 text-uppercase amount-num me-3 active-btn" onClick={() => { setAmount(haveCoins - transactionFee >= 0 ? haveCoins - transactionFee : 0); userAmountChange(haveCoins - transactionFee >= 0 ? haveCoins - transactionFee : 0) }}>
                          max
                        </p>
                        : null
                      }
                      <DropdownButton className="convert-dropdown" id="dropdown-basic-button" title={userCoin && userCoin.symbol ? userCoin.symbol : "Select"}>
                        {currencyData && currencyData.length > 0 && currencyData.map((currency) => (
                          <Dropdown.Item onClick={() => { userCoinChange(currency) }}>{currency.name}</Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </span>
                  </button>
                </div>
                {transactionFee ?
                  <p className='text-white text-center'>
                    <FontAwesomeIcon icon={faInfoCircle} className='me-2' />
                    {transactionFee} % Conversion fee will be deducted from the source currency.
                  </p>
                  : null
                }
              </div>
            </div>
            {!problem ?
              <>
                {userCoin && userCoin.symbol ? <>
                  <FontAwesomeIcon icon={faExchange} className="icon-exchange" onClick={() => exchange()} />

                  <div className="select-crypto w-100">
                    <div className="d-flex justify-content-between align-items-center flex-md-row flex-column mb-3">
                      <p className="p2 mb-md-0 mb-3 color-white">To</p>

                    </div>
                    <div className="coin-dropdown">
                      <div className="dropdown mb-3 rcv-amount">
                        <button
                          className="btn coin-btn theme-border w-100 d-flex justify-content-between align-items-center disabled-input"
                          type="button"
                        >
                          <input disabled type="number" value={exchangeAmount} />
                          <span className="d-flex">
                            <DropdownButton className="convert-dropdown" id="dropdown-basic-button" title={exchangeCoin && exchangeCoin.symbol ? exchangeCoin.symbol : "Select"}>
                              {currencyData && currencyData.length > 0 && currencyData.filter(c => c.symbol != userCoin.symbol).map((currency) => (
                                <Dropdown.Item onClick={() => { setExchangeCoin(currency); let a = currency?.symbol; setExchangeAmount((amount - (amount * (transactionFee / 100))) * exchangeRate[a]); setRate(exchangeRate[a]) }}>{currency.name}</Dropdown.Item>
                              ))}
                            </DropdownButton>
                          </span>
                        </button>
                      </div>
                      {rate ?
                        <p className='text-white text-center'>
                          <FontAwesomeIcon icon={faInfoCircle} className='me-2' />
                          Exhchange rate: {rate} {exchangeCoin && exchangeCoin.symbol ? exchangeCoin.symbol : "Coin"} per {userCoin && userCoin.symbol ? userCoin.symbol : "Coin"}
                        </p>
                        : null
                      }
                    </div>
                  </div>
                </>
                  : null
                }
                {userCoin && userCoin.symbol && exchangeCoin && exchangeCoin.symbol && amount && exchangeAmount ?
                  <button data-bn-type="button" className="css-jhwyyz btn convert-amount-btn" disabled="" onClick={(e) => handleConvert(e)}>Convert</button>
                  : null
                }
              </>
              : "There was a Problem Fetching the conversion amounts. Please try again another time"
            }
          </div>
        </Container>
      </section>
    </>
  );
};

export default Convert;
