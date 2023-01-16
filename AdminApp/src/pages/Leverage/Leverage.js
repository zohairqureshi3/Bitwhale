import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { deleteLeverage, displayLeverage } from '../../redux/leverage/leverageActions';
import { getRole } from '../../redux/roles/roleActions';
import { getPermission } from "../../config/helpers";
import Swal from 'sweetalert2';
import FullPageLoader from '../FullPageLoader/fullPageLoader';

const Leverage = () => {

   const dispatch = useDispatch();
   const leverageDta = useSelector(state => state.leverages?.leverage?.leverages);
   const [loader, setLoader] = useState(false);

   const roleData = useSelector(state => state.role.role);
   const permissions = roleData[0]?.permissions;
   const permissionName = getPermission(permissions);

   const success = useSelector(state => state.leverages?.success);
   const fetched = useSelector(state => state.leverages?.fetched);

   useEffect(() => {
      setLoader(true)
      dispatch(displayLeverage());
      if (fetched)
         setLoader(false)
   }, [success, fetched]);

   useEffect(() => {
      const loginData = localStorage.getItem('user');
      const data = JSON.parse(loginData);
      const id = data?.roleId;
      dispatch(getRole(id));
   }, [leverageDta])

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
            dispatch(deleteLeverage(id))
         }
      })
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <h3>Leverage Details</h3>
                     {/* {
                        permissionName && permissionName.length > 0 && permissionName.includes('set_leverage') ?
                           <Link to='/admin/set-leverage'><button className="btn-default hvr-bounce-in nav-button">Set Leverage</button></Link>
                           :
                           null
                     } */}
                     <Table responsive>
                        <thead>
                           <tr>
                              <th>Source Currency</th>
                              <th>Destination Currency</th>
                              <th>Leverage</th>
                              <th>Leverage Fee</th>
                              {
                                 permissionName && permissionName.length > 0 && permissionName.includes('edit_leverage', 'delete_leverage') ?
                                    <th>Action(s)</th>
                                    :
                                    null
                              }
                           </tr>
                        </thead>
                        <tbody>
                           {leverageDta && leverageDta.length > 0 && leverageDta.map((leverage) => {
                              return (
                                 <tr key={leverage._id}>
                                    <td>{leverage.sourceCurrency?.symbol}</td>
                                    <td>{leverage.destinationCurrency?.symbol}</td>
                                    <td>{leverage.leverage}</td>
                                    <td>{leverage.leverageFee}</td>
                                    <td>
                                       {
                                          permissionName && permissionName.length > 0 && permissionName.includes('edit_leverage') ?
                                             <button className="btn btn-primary me-2">
                                                <Link to={`/admin/edit-leverage/${leverage._id}`} className='text-decoration-none text-light'>Edit</Link>
                                             </button>
                                             :
                                             null
                                       }
                                       {/* {
                                          permissionName && permissionName.length > 0 && permissionName.includes('delete_leverage') ?
                                             <button className="btn btn-danger me-2" onClick={() => deleteAction(leverage._id)}>Delete</button>
                                             :
                                             null
                                       } */}
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

export default Leverage