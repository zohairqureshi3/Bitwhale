import React from 'react';
import Header from '../Header/Header';
import TradeCryptoFutures from './TradeCryptoFutures';
import CryptoFuturesPrices from './CryptoFuturesPrices';
import TradeAnywhere from './TradeAnywhere';
import WhyTrade from './WhyTrade';

const EarnPage = () => {
  return (
    <>
        <TradeCryptoFutures />
        <CryptoFuturesPrices />
        <TradeAnywhere />
        <WhyTrade />
    </>
  )
}

export default EarnPage