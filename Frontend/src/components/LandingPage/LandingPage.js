import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Banner from './Banner';
import PriceChart from './PriceChart';
import MarketTrend from './MarketTrend';
import Trade from './Trade';
import GetInTouch from './GetInTouch';

const LandingPage = () => {
  return (
    <>
        <Banner />
        <PriceChart />
        <MarketTrend />
        <Trade />
        <GetInTouch />
        <Footer />
    </>
  )
}

export default LandingPage