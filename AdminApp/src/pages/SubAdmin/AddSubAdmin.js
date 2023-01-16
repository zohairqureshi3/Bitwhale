import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterSubAdmin, updateState } from "../../redux/auth/authActions";
import { displayRoles } from "../../redux/roles/roleActions";
import FullPageLoader from "../FullPageLoader/fullPageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

const AddSubAdmin = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role?.roles.roles);
  const registered = useSelector(state => state.auth?.registered);
  const error = useSelector(state => state.auth?.error);

  useEffect(() => {
    dispatch(displayRoles());
  }, []);

  const initialUserState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (registered) {
      setUser(initialUserState);
      setLoader(false)
    }
    dispatch(updateState())
  }, [registered])

  useEffect(() => {
    if (error) {
      setLoader(false);
      dispatch(updateState())
    }
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();

    let roleId = "";
    roles?.forEach((element) => {
      if (element.name === "Sub Admin") {
        roleId = element._id;
      }
    });

    const { firstName, lastName, username, email, phone, password } = user;
    const exp = /^[a-z A-Z]+$/;
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    } else if (!username.match(exp)) {
      setErrors("Invalid username (Only letters a-z allowed)!");
    } else if (email === "") {
      setErrors("Email address is required!");
    } else if (!email.match(regexp)) {
      setErrors("Invalid email address!");
    } else if (phone === "") {
      setErrors("Phone number is required!");
    } else if (roleId === "") {
      setErrors("Role is required!");
    } else if (password === "") {
      setErrors("Password is required!");
    } else if (password.length < 5) {
      setErrors("Password must have at-least 6 characters!");
    } else {
      setLoader(true);
      setErrors("");
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        roleId: roleId,
        password: user.password,
      };
      dispatch(RegisterSubAdmin(data));
    }
  };

  return (
    <>
      {loader ? (
        <FullPageLoader />
      ) : (
        <div className="col-lg-9 col-md-8">
          <div className="content-wrapper">
            <div className="content-box">
              <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
              <h3>Add Sub Admin</h3>
              <form>
                <div className="form-group col-md-12">
                  <label className="control-label">First Name</label>
                  <input
                    type="text"
                    required="required"
                    className="form-control"
                    onChange={handleChange}
                    name="firstName"
                    value={user.firstName}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Last Name</label>
                  <input
                    type="text"
                    required="required"
                    className="form-control"
                    onChange={handleChange}
                    name="lastName"
                    value={user.lastName}
                    placeholder="Enter last name"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">User Name</label>
                  <input
                    type="text"
                    required="required"
                    className="form-control"
                    onChange={handleChange}
                    name="username"
                    value={user.username}
                    placeholder="Enter username"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Email</label>
                  <input
                    type="email"
                    required="required"
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                    value={user.email}
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Phone Number</label>
                  <input
                    type="number"
                    required="required"
                    className="form-control"
                    onChange={handleChange}
                    name="phone"
                    value={user.phone}
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Password</label>
                  <input
                    type="password"
                    required="required"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                    value={user.password}
                    placeholder="Enter password"
                  />
                </div>
                {errors ? (
                  <div style={{ color: "#FE6E00" }} className="alert alert-danger">
                    {errors}
                  </div>
                ) : ("")
                }
                <div>
                  <button
                    className="btn-default hvr-bounce-in nav-button"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSubAdmin;
