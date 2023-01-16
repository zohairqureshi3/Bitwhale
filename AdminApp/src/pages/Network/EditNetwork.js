import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editNetwork, getNetwork } from '../../redux/network/networkActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { MultiSelect } from "react-multi-select-component";
import { showAllCurrencies } from '../../redux/currency/currencyActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditNetwork = () => {

   const [loader, setLoader] = useState(false);
   const [network, setNetwork] = useState({ name: "", symbol: "" });
   const [errors, setErrors] = useState("");
   const history = useHistory();
   let { id } = useParams();
   const [options, setOptions] = useState([]);
   const [selected, setSelected] = useState([]);

   const currencies = useSelector(state => state.currency?.currencies?.allCurrencies);
   const success2 = useSelector(state => state.currency?.currencies?.success);

   useEffect(() => {
      dispatch(getNetwork(id))
   }, [])

   const getCurrencies = async () => {
      if (currencies) {
         const optionsValue = await currencies.map((currency) => ({
            "key": currency._id,
            "value": currency._id,
            "label": currency.name
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

   const dispatch = useDispatch();
   const networkData = useSelector(state => state?.network.networks);

   const handleChange = (e) => {
      setNetwork({ ...network, [e.target.name]: e.target.value })
   };

   useEffect(() => {
      if (networkData?.allNetworks) {
         // if (networkData && networkData.length > 0 && networkData.allNetworks[0].currencies && networkData.allNetworks[0].currencies.length > 0) {
         let tempCurr = []
         networkData.allNetworks[0].currencies.forEach(item => {
            tempCurr.push({
               "value": item._id,
               "label": item.name,
            })
         })
         setSelected(tempCurr)
      }
   }, [networkData]);

   useEffect(() => {
      if (networkData && networkData.allNetworks)
         setNetwork(networkData.allNetworks[0]);
   }, [networkData]);

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
         dispatch(editNetwork(id, data));
         setLoader(true);
         setNetwork({ name: "", symbol: "" });
         history.goBack();
      }
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            network && network ?
               <div className="col-lg-9 col-md-8">
                  <div className="content-wrapper">
                     <div className="content-box">
                        <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
                        <h3>Edit Network</h3>
                        <form>
                           <div className="form-group col-md-12">
                              <label className="control-label">Network Name</label>
                              <input type="text" required="required" className="form-control" name="name" onChange={handleChange}
                                 value={network.name} placeholder="Enter network name" />
                           </div>
                           <div className="form-group col-md-12">
                              <label className="control-label">Network Symbol</label>
                              <input type="text" required="required" className="form-control" onChange={handleChange}
                                 name="symbol" value={network.symbol} placeholder="Enter network symbol" />
                           </div>
                           <div className="form-group col-md-12">
                              <div className="form-group col-md-12">
                                 <label className="control-label">Select Currencies</label>
                                 <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select" />
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
               : ''
         }
      </>
   )
}

export default EditNetwork
