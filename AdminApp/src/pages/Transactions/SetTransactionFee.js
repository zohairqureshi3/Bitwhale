import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllCurrencies } from '../../redux/currency/currencyActions';
import { addTransactionFee } from '../../redux/transactionFee/transactionFeeActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

const SetTransactionFee = () => {

   const history = useHistory();
   const dispatch = useDispatch();
   const currencies = useSelector(state => state.currency?.currencies?.allCurrencies);

   const [transactionFee, setTransactionFee] = useState("");
   const [currency, setCurrency] = useState("");
   const [errors, setErrors] = useState("");
   const [loader, setLoader] = useState(false);
   const fetched = useSelector(state => state.currency.fetched);

   useEffect(() => {
      dispatch(showAllCurrencies());
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      var validNumber = new RegExp(/^\d*\.?\d*$/);
      if (currency === "") {
         setErrors("Please select the currency!");
      } else if (transactionFee === "") {
         setErrors("TransactionFee is required!");
      } else if (!transactionFee.match(validNumber)) {
         setErrors("Invalid Currency name (Only number 0-9 and decimals)!");
      }
      else {
         setLoader(true);
         setErrors("");
         const data = {
            currencyId: currency,
            fee: transactionFee
         }
         dispatch(addTransactionFee(data));
         setCurrency("");
         setTransactionFee("");
      }
   }

   useEffect(() => {
      if (fetched) {
         setLoader(false);
      }
   }, [fetched, currency])

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
                     <h3>Set Conversion Fee</h3>
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
                           <label className="control-label">Conversion Fee in (%)</label>
                           <input type="number" required="required" className="form-control" onChange={e => setTransactionFee(e.target.value)}
                              name="transactionFee" value={transactionFee} placeholder="Enter Conversion Fee" />
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

export default SetTransactionFee