import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayPermissions, deletePermission } from '../../redux/permissions/permissionActions';
import { Link } from 'react-router-dom';
import { getRole } from '../../redux/roles/roleActions';
import { getPermission } from '../../config/helpers';
import Swal from 'sweetalert2';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import DataTable from 'react-data-table-component';

const Permissions = () => {

   const dispatch = useDispatch();
   const permissions = useSelector(state => state.permission.permissions);

   const [loader, setLoader] = useState(false);
   const roleData = useSelector(state => state?.role.role);
   const loginPermissions = roleData[0]?.permissions;
   const permissionName = getPermission(loginPermissions);

   const success = useSelector(state => state.permission.success);
   const fetched = useSelector(state => state.permission.fetched);

   const columns = [
      {
         name: 'Permission',
         selector: row => row?.name,
         sortable: true,
      },
      {
         name: 'Action(s)',
         cell: row => {
            return (
               <>
                  {
                     permissionName && permissionName.length > 0 && permissionName.includes('delete_permission') ?
                        <button className="btn btn-danger btn-sm" onClick={() => deleteAction(row._id)}>Delete</button>
                        :
                        null
                  }
               </>
            );
         },
      }
   ];

   useEffect(() => {
      setLoader(true);
      dispatch(displayPermissions());
      if (fetched) {
         setLoader(false);
      }
   }, [fetched, success]);

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
            dispatch(deletePermission(id))
         }
      })
   }

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <h3>Permissions Details</h3>
                     <Link to='/admin/add-permission'><button className="btn-default hvr-bounce-in nav-button">Add Permission</button></Link>
                     <DataTable
                        columns={columns}
                        data={permissions}
                        pagination
                        fixedHeader
                        persistTableHead
                        highlightOnHover
                        defaultSortFieldId={1}
                     />
                  </div>
               </div>
            </div>
         }
      </>
   )
}

export default Permissions
