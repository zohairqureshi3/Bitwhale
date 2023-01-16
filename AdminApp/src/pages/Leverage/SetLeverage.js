import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllCurrencies } from '../../redux/currency/currencyActions';
import { addLeverage } from '../../redux/leverage/leverageActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';

const SetLeverage = () => {

   const dispatch = useDispatch();
   const currencies = useSelector(state => state.currency?.currencies?.allCurrencies);

   // sourceCurrencyId 
   // destinationCurrencyId
   const [sourceCurrencyId, setSourceCurrencyId] = useState("");
   const [destinationCurrencyId, setDestinationCurrencyId] = useState("");
   const [leverage, setLeverage] = useState("");
   const [leverageFee, setLeverageFee] = useState("");
   const [errors, setErrors] = useState("");
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      dispatch(showAllCurrencies());
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();
      var validNumber = new RegExp(/^\d*\.?\d*$/);
      if (leverage === "") {
         setErrors("Leverage is required!");
      } else if (!leverage.match(validNumber)) {
         setErrors("Invalid Fee (Only number 0-9 and decimals)!");
      } else if (leverageFee === "") {
         setErrors("leverageFee is required!");
      } else if (!leverageFee.toString().match(validNumber)) {
         setErrors("Invalid leverageFee (Only number 0-9 and decimals)!");
      } else {
         setLoader(true);
         setErrors("");
         const data = {
            sourceCurrencyId: sourceCurrencyId,
            destinationCurrencyId: destinationCurrencyId,
            leverage: leverage,
            leverageFee: leverageFee,
         }
         dispatch(addLeverage(data));
         setSourceCurrencyId("");
         setDestinationCurrencyId("");
         setLeverage("");
         setLeverageFee("");
      }
   }

   useEffect(() => {
      setLoader(false);
   }, [leverage])

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <h3>Set Leverage</h3>
                     <form>
                        <div className="form-group col-md-12">
                           <label className="control-label">Select Source Currency</label>
                           <select className="form-control" name="currency" required="required" onChange={e => setSourceCurrencyId(e.target.value)} value={sourceCurrencyId} >
                              <option value="">Select Currency</option>
                              {currencies && currencies.length > 0 && currencies.map((currency) => {
                                 return (
                                    <option value={currency._id} key={currency._id}>{currency.name}</option>
                                 )
                              })}
                           </select>
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Select Destination Currency</label>
                           <select className="form-control" name="currency" required="required" onChange={e => setDestinationCurrencyId(e.target.value)} value={destinationCurrencyId} >
                              <option value="">Select Currency</option>
                              {currencies && currencies.length > 0 && currencies.map((currency) => {
                                 return (
                                    <option value={currency._id} key={currency._id}>{currency.name}</option>
                                 )
                              })}
                           </select>
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Leverage</label>
                           <input type="number" max={100} required="required" className="form-control" onChange={e => setLeverage(e.target.value)}
                              name="leverage" value={leverage} placeholder="Enter Leverage" />
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Leverage Fee</label>
                           <input type="number" required="required" className="form-control" name="leverageFee" value={leverageFee} onChange={e => setLeverageFee(e.target.value)}
                              placeholder="Enter Leverage Fee" />
                        </div>
                        {errors ? (
                           <div style={{ color: "#FE6E00" }} className="alert alert-danger" >
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

export default SetLeverage