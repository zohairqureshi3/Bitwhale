import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNetwork, updateState } from '../../redux/network/networkActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { MultiSelect } from "react-multi-select-component";
import { showAllCurrencies } from '../../redux/currency/currencyActions';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddNetwork = () => {

   const history = useHistory();
   const dispatch = useDispatch();
   const initialUserState = { name: "", symbol: "" };
   const [network, setNetwork] = useState(initialUserState);
   const [loader, setLoader] = useState(false);
   const [errors, setErrors] = useState("");
   const success = useSelector(state => state.network.success);
   const [options, setOptions] = useState([]);
   const [selected, setSelected] = useState([]);
   const currencies = useSelector(state => state.currency?.currencies?.allCurrencies);
   const success2 = useSelector(state => state.currency?.currencies?.success);
   const error = useSelector(state => state.network?.error);
   
   const handleChange = (e) => {
      setNetwork({ ...network, [e.target.name]: e.target.value })
   };

   const getCurrencies = async () => {
      if (currencies) {
         const optionsValue = await currencies?.map((currency) => ({
            "key": currency?._id,
            "value": currency?._id,
            "label": currency?.name
         }));
         setOptions(optionsValue)
      }
   }

   useEffect(() => {
      getCurrencies();
   }, [currencies]);

   useEffect(() => {
      setLoader(true);
      dispatch(showAllCurrencies());
      if (success2) {
         setLoader(false);
      }
   }, [success2]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const { name, symbol } = network;
      if (name === "") {
         setErrors("Network name is required!");
      } else if (symbol === "") {
         setErrors("Symbol is required!");
      } else if (selected.length < 1) {
         setErrors("Please Select Currency!");
      } else {
         setLoader(true);
         setErrors("");
         let tempIds = [];
         selected.forEach(item => {
            tempIds.push(item.value)
         });
         const data = {
            name: network.name,
            symbol: network.symbol,
            currencyIds: tempIds
         }
         dispatch(addNetwork(data));
      }
   }

   useEffect(() => {
      if (success) {
         setLoader(false);
         setNetwork(initialUserState);
         // setSelected("");
      }
      dispatch(updateState())
   }, [success])

   useEffect(() => {
      if (error) {
        setLoader(false);
        dispatch(updateState())
      }
    }, [error])

   return (
      <>
         {loader ? <FullPageLoader /> :

            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
                     <h3>Add Network</h3>
                     <form>
                        <div className="form-group col-md-12">
                           <label className="control-label">Network Name</label>
                           <input type="text" required="required" className="form-control" onChange={handleChange}
                              name="name" value={network.name} placeholder="Enter network name" />
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Network Symbol</label>
                           <input type="text" required="required" className="form-control" onChange={handleChange}
                              name="symbol" value={network.symbol} placeholder="Enter network symbol" />
                        </div>
                        <div className="form-group col-md-12">
                           <div className="form-group col-md-12">
                              <label className="control-label">Select Currencies</label>
                              {/* <select className="form-control" name="currency" required="required" onChange={e => setCurrency(e.target.value)} value={currency} >
                                 <option value="">Select Currency</option>
                                 {currencies && currencies.length > 0 && currencies.map((currency) => {
                                    return (
                                       <option value={currency._id} key={currency._id}>{currency.name}</option>
                                    )
                                 })}
                              </select> */}
                              <MultiSelect name="options" options={options} value={selected} onChange={setSelected} labelledBy="Select" includeSelectAllOption='false'  />
                           </div>
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

export default AddNetwork
