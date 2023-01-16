import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrency } from '../../redux/currency/currencyActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

const AddCurrency = () => {

   const history = useHistory();
   const dispatch = useDispatch();
   const initialUserState = { name: "", symbol: "" };
   const [currency, setCurrency] = useState(initialUserState);
   const [loader, setLoader] = useState(false);
   const [errors, setErrors] = useState("")
   const [iconName, setIconName] = useState("");
   const [selectedIcon, setSelectedIcon] = useState(null);
   const success = useSelector(state => state.currency.success);

   const handleChange = (e) => {
      setCurrency({ ...currency, [e.target.name]: e.target.value })
   };

   const onChangeIcon = async (e) => {
      setIconName(e.target.files[0].name);
      setSelectedIcon(e.target.files[0]);
   };

   const handleSubmit = (e) => {
      const formData = new FormData();
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
         setLoader(true);
         setErrors("");
         const data = {
            name: currency.name,
            symbol: currency.symbol,
         }
         // formData.append("name", currency.name);
         // formData.append("symbol", currency.symbol);
         // // if (icon === "") {
         // //    formData.append("icon", iconName);
         // // } else {
         // //    formData.append("icon", icon, iconName);
         // // }
         // formData.append("iconName", iconName);
         // formData.append("icon", selectedIcon);
         // dispatch(addCurrency(formData));
         dispatch(addCurrency(data));
         setCurrency(initialUserState);
      }
   }

   useEffect(() => {
      if (success) {
         setLoader(false);
      }
   }, [success, currency])

   return (
      <>
         {loader ? <FullPageLoader /> :

            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
                     <h3>Add Currency</h3>
                     <form>
                        <div className="form-group col-md-12">
                           <label className="control-label">Currency Name</label>
                           <input type="text" required="required" className="form-control" onChange={handleChange}
                              name="name" value={currency.name} placeholder="Enter currency name" />
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Currency Symbol</label>
                           <input type="text" required="required" className="form-control" onChange={handleChange}
                              name="symbol" value={currency.symbol} placeholder="Enter currency symbol" />
                        </div>
                        {/* <div className="form-group col-md-12">
                           <label className="control-label">Upload Currency Icon </label>
                           <input type="file" className="form-control" name="icon" accept="image/*" onChange={onChangeIcon} />
                        </div> */}
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

export default AddCurrency
