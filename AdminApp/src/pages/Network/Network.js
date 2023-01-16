import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRole } from '../../redux/roles/roleActions';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPermission } from "../../config/helpers";
import { deleteNetwork, showAllNetworks } from '../../redux/network/networkActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';

const Network = () => {

   const [loader, setLoader] = useState(false);
   const dispatch = useDispatch();
   const networksData = useSelector(state => state.network.networks);
   const roleData = useSelector(state => state?.role.role);
   const permissions = roleData[0]?.permissions;
   const permissionName = getPermission(permissions);
   const success = useSelector(state => state.network?.success);
   useEffect(() => {
      // setLoader(true);
      dispatch(showAllNetworks());
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
            dispatch(deleteNetwork(id));
         }
      })
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <h3>Networks Details</h3>
                     {
                        permissionName && permissionName.length > 0 && permissionName.includes('add_network') ?
                           <Link to='/admin/add-network'><button className="btn-default hvr-bounce-in nav-button">Add Network</button></Link>
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
                                    permissionName && permissionName.length > 0 && permissionName.includes('edit_network', 'delete_network') ?
                                       <th>Action(s)</th>
                                       :
                                       null
                                 }
                              </tr>
                           </thead>
                           <tbody>
                              {networksData && networksData.length > 0 && networksData.map((network) => {
                                 return (
                                    <tr key={network?._id}>
                                       <td>{network.name}</td>
                                       <td>{network.symbol}</td>
                                       <td>
                                          {
                                             permissionName && permissionName.length > 0 && permissionName.includes('edit_network') ?
                                                <button className="btn btn-primary me-2">
                                                   <Link to={`/admin/edit-network/${network._id}`} className='text-decoration-none text-light'>Edit</Link>
                                                </button>
                                                :
                                                null
                                          }
                                          {
                                             permissionName && permissionName.length > 0 && permissionName.includes('delete_network') ?
                                                <button className="btn btn-danger me-2" onClick={() => deleteAction(network._id)}>Delete</button>
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

export default Network
