import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUser, showSubAdmins } from '../../redux/users/userActions';
import { getRole } from '../../redux/roles/roleActions';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPermission } from "../../config/helpers";
import FullPageLoader from '../FullPageLoader/fullPageLoader';

const SubAdmins = () => {

   const dispatch = useDispatch();
   const [loader, setLoader] = useState(false);
   const subAdmins = useSelector(state => state.users?.subAdmins);

   const roleData = useSelector(state => state?.role.role);
   const permissions = roleData[0]?.permissions;
   const permissionName = getPermission(permissions);

   const success = useSelector(state => state.users.success);
   const fetched = useSelector(state => state.users.fetched);

   useEffect(() => {
      setLoader(true);
      dispatch(showSubAdmins());
      if (fetched) {
         setLoader(false);
      }
   }, [success, fetched]);

   useEffect(() => {
      const loginData = localStorage.getItem('user');
      const data = JSON.parse(loginData);
      const id = data?.roleId;
      dispatch(getRole(id));
   }, [])

   const userAction = (id, type) => {
      Swal.fire({
         title: `Are you sure you want to ${type && type === "block" ? "block" : "unblock"}?`,
         html: '',
         showCloseButton: true,
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: `${type && type === "block" ? "Block" : "Unblock"}`
      }).then((result) => {
         if (result.isConfirmed) {
            const data = { status: type && type === "block" ? false : true }
            dispatch(editUser(id, data))
         }
      })
   }

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
            dispatch(deleteUser(id))
         }
      })
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <h3>Sub Admins Details</h3>
                     {
                        permissionName && permissionName.length > 0 && permissionName.includes('add_sub_admin') ?
                           <Link to='/admin/add-sub-admin'><button className="btn-default hvr-bounce-in nav-button">Add Sub Admin</button></Link>
                           :
                           null
                     }
                     <table className="table mt-3 table-responsive table">
                        <thead className="table_head">
                           <tr>
                              <th>Name</th>
                              <th>User Name</th>
                              <th>Email</th>
                              {
                                 permissionName && permissionName.length > 0 && permissionName.includes('edit_sub_admin', 'delete_sub_admin', 'block_sub_admin') ?
                                    <th>Action(s)</th>
                                    :
                                    null
                              }
                           </tr>
                        </thead>
                        <tbody>
                           {subAdmins && subAdmins.length > 0 ? subAdmins.map((data) => {
                              return (
                                 <tr key={data?._id}>
                                    <td>{data?.firstName}</td>
                                    <td>{data?.username}</td>
                                    <td>{data?.email}</td>
                                    <td>
                                       {
                                          permissionName && permissionName.length > 0 && permissionName.includes('edit_sub_admin') ?
                                             <button className="btn btn-primary me-2">
                                                <Link to={`/admin/edit-sub-admin/${data?._id}`} className='text-decoration-none text-light'>Edit</Link>
                                             </button>
                                             :
                                             null
                                       }
                                       {
                                          permissionName && permissionName.length > 0 && permissionName.includes('delete_sub_admin') ?
                                             <button className="btn btn-danger me-2" onClick={() => deleteAction(data?._id)}>Delete</button>
                                             :
                                             null
                                       }
                                       {
                                          permissionName && permissionName.length > 0 && permissionName.includes('block_sub_admin') ?
                                             <>
                                                {data?.status === true ?
                                                   <button className="btn btn-warning me-2" onClick={() => userAction(data?._id, "block")}>Block</button>
                                                   : <button className="btn btn-warning me-2" onClick={() => userAction(data?._id, "unBlock")}>Unblock</button>
                                                }
                                             </>
                                             :
                                             null
                                       }
                                    </td>
                                 </tr>
                              )

                           }) : null}

                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         }
      </>
   )
}

export default SubAdmins