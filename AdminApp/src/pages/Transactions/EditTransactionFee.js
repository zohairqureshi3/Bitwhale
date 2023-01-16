import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAllCurrencies } from '../../redux/currency/currencyActions';
import { editTransactionFee, getTransactionFee } from '../../redux/transactionFee/transactionFeeActions';
import { useParams, useHistory } from 'react-router-dom';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditTransactionFee = () => {

   let { id } = useParams();

   useEffect(() => {
      dispatch(showAllCurrencies());
      dispatch(getTransactionFee(id));
   }, []);

   const [fee, setFee] = useState("");
   const [name, setName] = useState("");
   const [errors, setErrors] = useState("");
   const [loader, setLoader] = useState(false);

   const dispatch = useDispatch();
   const transactionFeeData = useSelector(state => state.transactionFee?.txFee);

   useEffect(() => {
      setFee(transactionFeeData?.fee);
      setName(transactionFeeData?.currencies._id);
   }, [transactionFeeData?.fee]);

   const currencies = useSelector(state => state.currency?.currencies?.allCurrencies);
   const history = useHistory();

   const handleSubmit = (e) => {
      e.preventDefault();
      var validNumber = new RegExp(/^\d*\.?\d*$/);
      if (name === "") {
         setErrors("Please Select Currency name!");
      } else if (fee === "") {
         setErrors("TransactionFee is required!");

      } else if (!fee.toString().match(validNumber)) {
         setErrors("Invalid fee (Only number 0-9 and decimals)!");
      }
      else {
         setLoader(true);
         setErrors("");
         const data = {
            currencyId: name,
            fee: fee
         }
         dispatch(editTransactionFee(id, data));
         history.goBack();
      }
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
                     <h3>Edit Conversion Fee</h3>
                     <form>
                        <div className="form-group col-md-12">
                           <label className="control-label">Select Currency</label>
                           <select className="form-control" required="required" name="name" value={name} onChange={e => setName(e.target.value)} >
                              {currencies && currencies.length > 0 && currencies.map((currency) => {
                                 return (
                                    <option value={currency._id} key={currency._id}>{currency.name}</option>
                                 )
                              })}
                           </select>
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Conversion Fee</label>
                           <input type="text" required="required" className="form-control" name="fee" value={fee} onChange={e => setFee(e.target.value)}
                              placeholder="Enter Conversion Fee" />
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

export default EditTransactionFee