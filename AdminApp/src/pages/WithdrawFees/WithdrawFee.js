import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { deleteWithdrawFee, displayWithdrawFee } from '../../redux/withdrawFee/withdrawFeeActions';
import { getRole } from '../../redux/roles/roleActions';
import { getPermission } from "../../config/helpers";
import Swal from 'sweetalert2';
import FullPageLoader from '../FullPageLoader/fullPageLoader';

const WithdrawFee = () => {

   const dispatch = useDispatch();
   const withdrawFeeDta = useSelector(state => state.withdrawFee.withdrawFee.withdrawFees);
   const [loader, setLoader] = useState(false);

   const roleData = useSelector(state => state.role.role);
   const permissions = roleData[0]?.permissions;
   const permissionName = getPermission(permissions);

   const success = useSelector(state => state.withdrawFee.success);
   const fetched = useSelector(state => state.withdrawFee.fetched);

   useEffect(() => {
      setLoader(true)
      dispatch(displayWithdrawFee());
      if (fetched)
         setLoader(false)
   }, [success, fetched]);

   useEffect(() => {
      const loginData = localStorage.getItem('user');
      const data = JSON.parse(loginData);
      const id = data?.roleId;
      dispatch(getRole(id));
   }, [withdrawFeeDta])

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
            dispatch(deleteWithdrawFee(id))
         }
      })
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <h3>Withdraw Fee Details</h3>
                     {
                        permissionName && permissionName.length > 0 && permissionName.includes('set_withdraw_fee') ?
                           <Link to='/admin/set-withdraw-fee'><button className="btn-default hvr-bounce-in nav-button">Set Withdraw Fee</button></Link>
                           :
                           null
                     }
                     <Table responsive>
                        <thead>
                           <tr>
                              <th>Currency</th>
                              <th>Network</th>
                              <th>Fee</th>
                              <th>Min</th>
                              <th>Max</th>
                              {
                                 permissionName && permissionName.length > 0 && permissionName.includes('edit_withdraw_fee', 'delete_withdraw_fee') ?
                                    <th>Action(s)</th>
                                    :
                                    null
                              }
                           </tr>
                        </thead>
                        <tbody>
                           {withdrawFeeDta && withdrawFeeDta.length > 0 && withdrawFeeDta.map((withdrawFee) => {
                              return (
                                 <tr key={withdrawFee._id}>
                                    <td>{withdrawFee.currencies.name}</td>
                                    <td>{withdrawFee.networks.name}</td>
                                    <td>{withdrawFee.fee}</td>
                                    <td>{withdrawFee.min}</td>
                                    <td>{withdrawFee.max}</td>
                                    <td>
                                       {
                                          permissionName && permissionName.length > 0 && permissionName.includes('edit_withdraw_fee') ?
                                             <button className="btn btn-primary me-2">
                                                <Link to={`/admin/edit-withdraw-fee/${withdrawFee._id}`} className='text-decoration-none text-light'>Edit</Link>
                                             </button>
                                             :
                                             null
                                       }
                                       {
                                          permissionName && permissionName.length > 0 && permissionName.includes('delete_withdraw_fee') ?
                                             <button className="btn btn-danger me-2" onClick={() => deleteAction(withdrawFee._id)}>Delete</button>
                                             :
                                             null
                                       }
                                    </td>
                                 </tr>
                              )
                           })}
                        </tbody>
                     </Table>
                  </div>
               </div>
            </div>
         }
      </>
   )
}

export default WithdrawFee