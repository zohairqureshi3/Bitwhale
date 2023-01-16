import React from 'react';
import Header from '../Header/Header';
import DepositOverview from './DepositOverview';
import RecentDeposit from './RecentDeposit';

const DepositPage = () => {
  return (
    <>
        <DepositOverview />
        <RecentDeposit />
    </>
  )
}

export default DepositPage