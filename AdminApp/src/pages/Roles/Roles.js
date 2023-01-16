import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayRoles, deleteRole } from '../../redux/roles/roleActions';
import { Link } from 'react-router-dom';
import { getRole } from '../../redux/roles/roleActions';
import { getPermission } from "../../config/helpers";
import Swal from 'sweetalert2';
import FullPageLoader from '../FullPageLoader/fullPageLoader';

const Roles = () => {

   const dispatch = useDispatch();
   const [loader, setLoader] = useState(false);
   const roles = useSelector(state => state.role?.roles?.roles);
   const success = useSelector(state => state.role?.roles?.success);

   const roleData = useSelector(state => state?.role.role);

   const permissions = roleData[0]?.permissions;
   const permissionName = getPermission(permissions);

   // const success = useSelector(state => state.role.success);

   useEffect(() => {
      setLoader(true);
      dispatch(displayRoles());
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
            dispatch(deleteRole(id))
         }
      })
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <h3>Roles Details</h3>
                     {
                        permissionName && permissionName.length > 0 && permissionName.includes('add_role') ?
                           <Link to='/admin/add-role'><button className="btn-default hvr-bounce-in nav-button">Add Role</button></Link>
                           :
                           null
                     }
                     <div className="table mt-3 table-responsive">
                        <table className="table">
                           <thead className="table_head">
                              <tr>
                                 <th>Role</th>
                                 {
                                    permissionName && permissionName.length > 0 && permissionName.includes('edit_role', 'delete_delete', 'view_permissions_per_role') ?
                                       <th>Action(s)</th>
                                       :
                                       null
                                 }
                              </tr>
                           </thead>
                           <tbody>
                              {roles && roles.length > 0 && roles.map((role) => {
                                 return (
                                    <tr key={role?._id}>
                                       <td>{role?.name}</td>
                                       <td>
                                          {
                                             permissionName && permissionName.length > 0 && permissionName.includes('edit_role') ?
                                                <button className="btn btn-primary me-2">
                                                   <Link to={`/admin/edit-role/${role?._id}`} className='text-decoration-none text-light'>Edit</Link>
                                                </button>
                                                :
                                                null
                                          }
                                          {
                                             permissionName && permissionName.length > 0 && permissionName.includes('delete_role') ?
                                                <button className="btn btn-danger me-2" onClick={() => deleteAction(role?._id)}>Delete</button>
                                                :
                                                null
                                          }
                                          {
                                             permissionName && permissionName.length > 0 && permissionName.includes('view_permissions_per_role') ?
                                                <button className="btn btn-warning me-2">
                                                   <Link to={`/admin/permission-per-role/${role?._id}`} className='text-decoration-none text-light'>View Details</Link>
                                                </button>
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

export default Roles
