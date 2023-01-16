import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllCurrencies } from '../../redux/currency/currencyActions';
import { showAllNetworks } from '../../redux/network/networkActions';
import { addWithdrawFee } from '../../redux/withdrawFee/withdrawFeeActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';

const SetWithdrawFee = () => {

   const dispatch = useDispatch();
   const currencies = useSelector(state => state.currency?.currencies?.allCurrencies);
   const networks = useSelector(state => state.network?.networks?.allNetworks);
   const dataAdded = useSelector(state => state.withdrawFee?.withdrawFee?.success);

   const [withdrawFee, setWithdrawFee] = useState("");
   const [actualFee, setActualFee] = useState("");
   const [min, setMin] = useState("");
   const [max, setMax] = useState("");
   const [currency, setCurrency] = useState("");
   const [network, setNetwork] = useState("");
   const [errors, setErrors] = useState("");
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      dispatch(showAllCurrencies());
      dispatch(showAllNetworks());
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      var validNumber = new RegExp(/^\d*\.?\d*$/);
      if (currency === "") {
         setErrors("Currency select the currency!");
      } else if (withdrawFee === "") {
         setErrors("WithdrawFee is required!");
      } else if (!withdrawFee.match(validNumber)) {
         setErrors("Invalid Fee (Only number 0-9 and decimals)!");
      } else if (actualFee === "") {
         setErrors("actualFee is required!");
      } else if (!actualFee.toString().match(validNumber)) {
         setErrors("Invalid actualFee (Only number 0-9 and decimals)!");
      } else if (min === "") {
         setErrors("WithdrawFee is required!");
      } else if (!min.match(validNumber)) {
         setErrors("Invalid Min number (Only number 0-9 and decimals)!");
      } else if (max === "") {
         setErrors("WithdrawFee is required!");
      } else if (!max.match(validNumber)) {
         setErrors("Invalid Max number (Only number 0-9 and decimals)!");
      }
      else {
         setLoader(true);
         setErrors("");
         const data = {
            currencyId: currency,
            networkId: network,
            fee: withdrawFee,
            actualFee: actualFee,
            min: min,
            max: max
         }
         dispatch(addWithdrawFee(data));
         setCurrency("");
         setNetwork("");
         setWithdrawFee("");
         setActualFee("");
         setMin("");
         setMax("");
      }
   }

   useEffect(() => {
      setLoader(false);
   }, [network])

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <h3>Set Withdraw Fee</h3>
                     <form>
                        <div className="form-group col-md-12">
                           <label className="control-label">Select Currency</label>
                           <select className="form-control" name="currency" required="required" onChange={e => setCurrency(e.target.value)} value={currency} >
                              <option value="">Select Currency</option>
                              {currencies && currencies.length > 0 && currencies.map((currency) => {
                                 return (
                                    <option value={currency._id} key={currency._id}>{currency.name}</option>
                                 )
                              })}
                           </select>
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Select Network</label>
                           <select className="form-control" name="network" required="required" onChange={e => setNetwork(e.target.value)} value={network} >
                              <option value="">Select Network</option>
                              {networks && networks.length > 0 && networks.map((network => {
                                 return (
                                    <option value={network._id} key={network._id}>{network.name}</option>
                                 )
                              }))}
                           </select>
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Withdraw Fee</label>
                           <input type="number" required="required" className="form-control" onChange={e => setWithdrawFee(e.target.value)}
                              name="withdrawFee" value={withdrawFee} placeholder="Enter Withdraw Fee" />
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Actual Fee (in GWEI)</label>
                           <input type="number" required="required" className="form-control" name="actualFee" value={actualFee} onChange={e => setActualFee(e.target.value)}
                              placeholder="Enter Actual Fee" />
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Min Transfer Amount Allowed</label>
                           <input type="number" required="required" className="form-control" onChange={e => setMin(e.target.value)}
                              name="min" value={min} placeholder="Enter Min Amount" />
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Max Transfer Amount Allowed</label>
                           <input type="number" required="required" className="form-control" onChange={e => setMax(e.target.value)}
                              name="max" value={max} placeholder="Enter Max Amount" />
                        </div>
                        {errors ? (
                           <div
                              style={{ color: "#FE6E00" }}
                              className="alert alert-danger"
                           >
                              {errors}
                           </div>
                        ) : (
                           ""
                        )}
                        <div>
                           <button className="btn-default hvr-bounce-in nav-button" onClick={handleSubmit}>Save</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         }
      </>
   )
}

export default SetWithdrawFee