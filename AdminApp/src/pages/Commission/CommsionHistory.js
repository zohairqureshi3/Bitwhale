import React, { useState, useMemo, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from '../../components/FilterComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getLeverageOrders } from '../../redux/leverageOrder/leverageOrderActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { Link } from 'react-router-dom';

const CommissionHistory = () => {

  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const orders = useSelector(state => state.LeverageOrders?.orders?.orders);
  const success = useSelector(state => state.LeverageOrders?.orders?.success);

  useEffect(() => {
    setLoader(true)
    dispatch(getLeverageOrders());
  }, [])

  useEffect(() => {
    if (success) setLoader(false)
  }, [success])

  const columns = [
    {
      name: 'User',
      selector: row =>
        <Link to={`/admin/user-detail/${row?.user?._id}`} className='text-decoration-none' >
          {row?.user.username}
        </Link >,
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row?.marginType == 1 ? "Isolated" : "Cross",
      sortable: true,
    },
    {
      name: 'Trading Pair',
      selector: row => row?.fromCurrency.symbol + row?.toCurrency.symbol,
      sortable: true,
    },
    {
      name: 'Trading Type',
      selector: row => row?.tradeType == 1 ? "Buy" : "Sell",
      sortable: true,
    },
    {
      name: 'Trading volume',
      selector: row => (parseFloat(row?.userInvestedAmount + (row?.leverage * row?.userInvestedAmount))).toFixed(4),
      sortable: true,
    },
    // {
    //   name: 'Total Fee',
    //   selector: row => "0.00000",
    //   sortable: true,
    // },
    {
      name: 'Total Fee Paid',
      selector: row => row?.tradingFeePaid ? row?.tradingFeePaid : 0,
      sortable: true,
    },
    // {
    //   name: 'Rebate Ration',
    //   selector: row => "0", // TBA
    //   sortable: true,
    // },
    {
      name: 'Profit/Loss',
      selector: row => row?.tradeProfitOrLoss ? row?.tradeProfitOrLoss : 0,
      sortable: true,
    },

    {
      name: 'Start Time',
      selector: row => row?.createdAt.replace('T', ' ').replace('Z', ' '),
      sortable: true,
    },
    {
      name: 'End Time',
      selector: row => row?.updatedAt.replace('T', ' ').replace('Z', ' '),
      sortable: true,
    }
  ]

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      {loader ? <FullPageLoader /> : null}
      <div className="col-lg-9 col-md-8">
        <div className="content-wrapper">
          <div className="content-box">
            <h5>Trade History</h5>

            <br />
            <div className='table-responsive'>
              <DataTable
                columns={columns}
                data={
                  'isolated'.includes(filterText.toLowerCase()) ?
                    orders?.filter(row => (row?.marginType == 1))
                    :
                    'cross'.includes(filterText.toLowerCase()) ?
                      orders?.filter(row => (row?.marginType != 1))
                      :
                      'buy'.includes(filterText.toLowerCase()) ?
                        orders?.filter(row => (row?.tradeType == 1))
                        :
                        'sell'.includes(filterText.toLowerCase()) ?
                          orders?.filter(row => (row?.tradeType != 1))
                          :
                          orders?.filter(row => (row.user.username.toLowerCase()?.includes(filterText.toLowerCase()) ||
                            (row?.fromCurrency.symbol + row?.toCurrency.symbol).toLowerCase().includes(filterText.toLowerCase()) ||
                            (row?.tradingFeePaid ? row?.tradingFeePaid : "0").toString().includes(filterText) ||
                            (row?.tradeProfitOrLoss ? row?.tradeProfitOrLoss : '0').toString().includes(filterText) ||
                            (parseFloat(row?.userInvestedAmount + (row?.leverage * row?.userInvestedAmount))).toFixed(4).toString().includes(filterText)
                          ))
                }
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                fixedHeader
                persistTableHead
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommissionHistory