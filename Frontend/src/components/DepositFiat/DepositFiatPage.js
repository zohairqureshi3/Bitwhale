import React from 'react';
import Header from '../Header/Header';
import DepositFiatOverview from './DepositFiatOverview';
import DepositFiatCard from './DepositFiatCard';

const DepositFiatPage = () => {
  return (
    <>
        <DepositFiatOverview />
        <DepositFiatCard />
    </>
  )
}

export default DepositFiatPage