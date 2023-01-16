import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editCurrency, getCurrency } from '../../redux/currency/currencyActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditCurrency = () => {

   const [loader, setLoader] = useState(false);
   const [currency, setCurrency] = useState({ name: "", symbol: "" });
   const [errors, setErrors] = useState("");
   const history = useHistory();
   let { id } = useParams();

   useEffect(() => {
      dispatch(getCurrency(id))
   }, [])

   const dispatch = useDispatch();
   const currencyData = useSelector(state => state.currency?.currencies?.allCurrencies);
   const handleChange = (e) => {
      setCurrency({ ...currency, [e.target.name]: e.target.value })
   };

   useEffect(() => {
      if (currencyData)
         setCurrency(currencyData[0]);
   }, [currencyData]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const { name, symbol } = currency;
      const exp = /^[a-z A-Z]+$/;
      if (name === "") {
         setErrors("Currency name is required!");
      } else if (!name.match(exp)) {
         setErrors("Invalid Currency name (Only letters a-z allowed)!");
      } else if (symbol === "") {
         setErrors("Symbol is required!");
      } else {
         setErrors("");
         const data = {
            name: currency.name,
            symbol: currency.symbol
         }
         dispatch(editCurrency(id, data));
         setLoader(true);
         setCurrency({ name: "", symbol: "" });
         history.goBack();
      }
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            currency && currency ?
               <div className="col-lg-9 col-md-8">
                  <div className="content-wrapper">
                     <div className="content-box">
                        <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
                        <h3>Edit Currency</h3>
                        <form>
                           <div className="form-group col-md-12">
                              <label className="control-label">Currency Name</label>
                              <input type="text" required="required" className="form-control" name="name" onChange={handleChange}
                                 value={currency.name} placeholder="Enter currency name" />
                           </div>
                           <div className="form-group col-md-12">
                              <label className="control-label">Currency Symbol</label>
                              <input type="text" required="required" className="form-control" onChange={handleChange}
                                 name="symbol" value={currency.symbol} placeholder="Enter currency symbol" />
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
               : ''
         }
      </>
   )
}

export default EditCurrency
