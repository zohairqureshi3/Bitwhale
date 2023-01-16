import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrency, showAllCurrencies } from '../../redux/currency/currencyActions';
import { getRole } from '../../redux/roles/roleActions';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPermission } from "../../config/helpers";
import FullPageLoader from '../FullPageLoader/fullPageLoader';

const Currency = () => {

   const [loader, setLoader] = useState(false);
   const dispatch = useDispatch();
   const currencies = useSelector(state => state.currency?.currencies?.allCurrencies);
   const roleData = useSelector(state => state.role?.role);
   const permissions = roleData[0]?.permissions;

   const permissionName = getPermission(permissions);
   const success = useSelector(state => state.currency?.currencies?.success);

   useEffect(() => {
      setLoader(true);
      dispatch(showAllCurrencies());
      if (success) {
         setLoader(false);
      }
   }, [success]);

   useEffect(() => {
      const loginData = localStorage.getItem('user');
      const data = JSON.parse(loginData);
      const id = data?.roleId;
      dispatch(getRole(id));
   }, [])

   const deleteAction = (id) => {
      Swal.fire({
         title: `Are you sure want to Delete?`,
         html: '',
         showCloseButton: true,
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: "Yes"
      }).then((result) => {
         if (result.isConfirmed === true ? true : false) {
            dispatch(deleteCurrency(id));
         }
      })
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <h3>Currencies Details</h3>
                     {
                        permissionName && permissionName.length > 0 && permissionName.includes('add_currency') ?
                           <Link to='/admin/add-currency'><button className="btn-default hvr-bounce-in nav-button">Add Currency</button></Link>
                           :
                           null
                     }
                     <div className="mt-3 table-responsive">
                        <table className="table">
                           <thead className="table_head">
                              <tr>
                                 <th>Name</th>
                                 <th>Symbol</th>
                                 {
                                    permissionName && permissionName.length > 0 && permissionName.includes('edit_currency', 'delete_currency') ?
                                       <th>Action(s)</th>
                                       :
                                       null
                                 }
                              </tr>
                           </thead>
                           <tbody>
                              {currencies && currencies.length > 0 && currencies.map((currency) => {
                                 return (
                                    <tr key={currency._id}>
                                       <td>{currency.name}</td>
                                       <td>{currency.symbol}</td>
                                       <td>
                                          {
                                             permissionName && permissionName.length > 0 && permissionName.includes('edit_currency') ?
                                                <button className="btn btn-primary me-2">
                                                   <Link to={`/admin/edit-currency/${currency._id}`} className='text-decoration-none text-light'>Edit</Link>
                                                </button>
                                                :
                                                null
                                          }
                                          {
                                             permissionName && permissionName.length > 0 && permissionName.includes('delete_currency') ?
                                                <button className="btn btn-danger me-2" onClick={() => deleteAction(currency._id)}>Delete</button>
                                                :
                                                null
                                          }
                                       </td>
                                    </tr>
                                 )
                              })}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         }
      </>
   )
}

export default Currency
