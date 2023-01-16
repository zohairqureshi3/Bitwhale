import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSentAmountToUser } from "../../redux/users/userActions";
import DataTable from 'react-data-table-component';

const SentAmountToUsers = () => {

   const dispatch = useDispatch();
   const transactionData = useSelector(state => state.users?.sentAmountToUser?.transactions)

   useEffect(() => {
      dispatch(getSentAmountToUser())
   }, []);

   const columns = [
      {
         name: 'Name',
         selector: row => row?.toAccount.username,
         sortable: true,
      },
      {
         name: 'Email',
         selector: row => row?.toAccount.email,
         sortable: true,
      },
      {
         name: 'Currency',
         selector: row => row?.currencies.name,
         sortable: true,
      },
      {
         name: 'Symbol',
         selector: row => row?.currencies.symbol,
         sortable: true,
      },
      {
         name: 'Amount',
         selector: row => row?.amount,
         sortable: true,
      },
   ];

   return (
      <>
         <DataTable
            columns={columns}
            data={transactionData}
            pagination
            fixedHeader
            persistTableHead
            highlightOnHover
         />
      </>
   )
}

export default SentAmountToUsers