import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editUser, getUser } from "../../redux/users/userActions";
import FullPageLoader from "../FullPageLoader/fullPageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState("");
  let { id } = useParams();
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users?.user);
  const success = useSelector(state => state.users.success);
  const history = useHistory();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName } = user;
    const exp = /^[a-z A-Z]+$/;
    if (firstName === "") {
      setErrors("Firstname is required!");
    } else if (!firstName.match(exp)) {
      setErrors("Invalid firstname (Only letters a-z allowed)!");
    } else if (lastName === "") {
      setErrors("Lastname is required!");
    } else if (!lastName.match(exp)) {
      setErrors("Invalid lastname (Only letters a-z allowed)!");
    } else {
      setLoader(true);
      setErrors("");
      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
      };
      dispatch(editUser(id, data));
      // window.location.href = '/admin/users'
    }
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  useEffect(() => {
    if(success) {
      history.goBack();
    }
  }, [success]);

  return (
    <>
      {loader ? (<FullPageLoader />) : user && user ? (
        <div className="col-lg-9 col-md-8">
          <div className="content-wrapper">
            <div className="content-box">
            <FontAwesomeIcon className="faArrowLeftIcon" icon={faArrowLeft} onClick={() => history.goBack()} />
              <h3>Edit User</h3>
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
                    value={user.username}
                    disabled
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Email</label>
                  <input
                    type="email"
                    required="required"
                    className="form-control"
                    value={user.email}
                    disabled
                  />
                </div>
                {errors ? (
                  <div
                    style={{ color: "#FE6E00" }}
                    className="alert alert-danger"
                  >
                    {" "}
                    {errors}{" "}
                  </div>
                ) : (
                  ""
                )}
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
  );
};

export default EditUser;
