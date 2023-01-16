import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getRole } from '../../redux/roles/roleActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DataTable from 'react-data-table-component';

const PermissionPerRole = () => {

   const history = useHistory();
   let { id } = useParams();

   const dispatch = useDispatch();
   const roleData = useSelector(state => state.role?.editRole[0]?.permissions);
   const fetched = useSelector(state => state.role?.fetched);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      setLoader(true)
      dispatch(getRole(id));
   }, []);

   useEffect(() => {
      if (fetched) {
         setLoader(false)
      }
   }, [fetched]);

   const columns = [
      {
         name: 'Permissions',
         selector: row => row.name,
         sortable: true,
      }
   ];

   return (
      <>
         {loader ? <FullPageLoader /> :
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
                     <h3>Permissions Per Role</h3>
                     {/* <table className="table mt-3">
                        <thead className="table_head">
                           <tr>
                              <th>Permissions</th>
                           </tr>
                        </thead>
                        <tbody>
                           {roleData && roleData.length > 0 && roleData.map((role) => {
                              return (
                                 <tr key={role._id}>
                                    <td>{role.name}</td>
                                 </tr>
                              )
                           })}
                        </tbody>
                     </table> */}
                     <DataTable
                        columns={columns}
                        data={roleData}
                        pagination
                        subHeader
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

export default PermissionPerRole
