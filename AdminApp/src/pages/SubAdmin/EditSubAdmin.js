import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editUser, singleSubAdmin } from '../../redux/users/userActions';
import FullPageLoader from '../FullPageLoader/fullPageLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditSubAdmin = () => {

   const [user, setUser] = useState({ firstName: "", lastName: "", username: "", email: "" });
   const [errors, setErrors] = useState("")
   let { id } = useParams();
   const [loader, setLoader] = useState(false);

   const dispatch = useDispatch();
   const userData = useSelector(state => state.users?.subAdmins.user);
   const history = useHistory();

   useEffect(() => {
      dispatch(singleSubAdmin(id));
   }, []);

   useEffect(() => {
      setUser(userData);
   }, [userData]);

   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value })
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const { firstName, lastName, username, email } = user;
      const exp = /^[a-z A-Z]+$/;
      const exp2 = /^[a-z A-Z 0-9 _-]+$/;
      const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (firstName === "") {
         setErrors("Firstname is required!");
      } else if (!firstName.match(exp)) {
         setErrors("Invalid firstname (Only letters a-z allowed)!");
      } else if (lastName === "") {
         setErrors("Lastname is required!");
      } else if (!lastName.match(exp)) {
         setErrors("Invalid lastname (Only letters a-z allowed)!");
      } else if (username === "") {
         setErrors("Username is required!");
      } else if (!username.match(exp2)) {
         setErrors("Invalid username (Only letters a-z allowed)!");
      } else if (email === "") {
         setErrors("Email address is required!");
      } else if (!email.match(regexp)) {
         setErrors("Invalid email address!");
      }
      else {
         setLoader(true);
         setErrors("");
         const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email
         };
         dispatch(editUser(id, data));
         setUser({ firstName: "", lastName: "", username: "", email: "" });
         history.goBack();
      }
   };

   return (
      <>
         {loader ? (<FullPageLoader />) : user && user ? (
            <div className="col-lg-9 col-md-8">
               <div className="content-wrapper">
                  <div className="content-box">
                     <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
                     <h3>Edit Sub Admin</h3>
                     <form>
                        <div className="form-group col-md-12">
                           <label className="control-label">First Name</label>
                           <input type="text" required="required" className="form-control" onChange={handleChange}
                              name="firstName" value={user.firstName} placeholder="Enter first name" />
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Last Name</label>
                           <input type="text" required="required" className="form-control" onChange={handleChange}
                              name="lastName" value={user.lastName} placeholder="Enter last name" />
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">User Name</label>
                           <input type="text" required="required" className="form-control" onChange={handleChange}
                              name="username" value={user.username} placeholder="Enter user name" disabled />
                        </div>
                        <div className="form-group col-md-12">
                           <label className="control-label">Email</label>
                           <input type="email" required="required" className="form-control" onChange={handleChange}
                              name="email" value={user.email} placeholder="Enter email" disabled />
                        </div>
                        {errors ? (
                           <div style={{ color: "#FE6E00" }} className="alert alert-danger"> {errors} </div>
                        ) : ""
                        }
                        <div>
                           <button className="btn-default hvr-bounce-in nav-button me-2" onClick={handleSubmit}>Save</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         ) : ""
         }
      </>
   )
}

export default EditSubAdmin
