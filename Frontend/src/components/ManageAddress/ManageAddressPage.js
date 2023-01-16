import React from 'react';
import Header from '../Header/Header';
import AddAddress from './AddAddress';
import Addresses from './Addresses';

const ManageAddressPage = () => {
  return (
    <>
      <AddAddress />
      <Addresses />
    </>
  )
}

export default ManageAddressPage