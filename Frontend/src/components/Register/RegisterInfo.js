import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import PakImg from "../../assets/images/pakistan.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from "../../redux/auth/authActions";
import { displayRoles } from "../../redux/roles/roleActions";

const RegisterInfo = () => {

  const dispatch = useDispatch();
  const roles = useSelector(state => state.role?.roles.roles);

  const initialUserState = { firstName: "", lastName: "", username: "", email: "", phoneNumber: "", password: "", confirmPassword: "", referralCode: "" };
  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState("");
  // const [code, setCode] = useState("");
  // const [refsCount, setRefCount] = useState(0);

  useEffect(() => {
    dispatch(displayRoles());
  }, []);

  // useEffect(() => {
  //   let inviteCode = JSON.parse(localStorage.getItem("code"))
  //   let refCount = JSON.parse(localStorage.getItem("refCount"))
  //   setCode(inviteCode);
  //   setRefCount(refCount ? (parseInt(refCount) + 1) : 0)
  // }, [])

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let roleId = '';
    roles?.forEach(element => {
      if (element.name === 'Master') {
        roleId = element._id
      }
    });

    const { firstName, lastName, username, email, phoneNumber, password, confirmPassword, referralCode } = user;
    const exp = /^[a-z A-Z]+$/;
    const numCheck = /^[0-9]*$/;
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
    } else if (email === "") {
      setErrors("Email address is required!");
    } else if (!email.match(regexp)) {
      setErrors("Invalid email address!");
    } else if (phoneNumber === "") {
      setErrors("Phone number is required!");
    } else if (!phoneNumber.match(numCheck)) {
      setErrors("Invalid phone number!");
    } else if (password === "") {
      setErrors("Password is required!");
    } else if (password.length < 5) {
      setErrors(
        "Password must have at-least 6 characters!",
      );
    } else if (password !== confirmPassword) {
      setErrors("Password and Confirm Password does not match!");
    } else {
      setErrors("");

      const myArray = referralCode.split("-");
      const code = myArray[0];
      const refsCount = parseInt(myArray[1]) + parseInt(1);

      const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        phone: user.phoneNumber,
        password: user.password,
        refererId: code,
        refCount: refsCount,
        roleId: roleId
      }
      console.log(data, "data");
      dispatch(RegisterUser(data));
    }
  }

  return (
    <section className="account-login">
      <div className="text-center bottom-space mb-lg-0 container-fluid custom-box">
        <h3 className="text-capitalize mb-lg-3">Enter Account Details</h3>
        <p>
          Enter a Account/Phone number details to secure your account with phone
          number.
        </p>
      </div>
      <div className="account-bg register create-account">
        <div className="banner">
          <div className="container-fluid custom-box">
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Register Now">
                <form className="account-form">
                  <div className="mb-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="form-control"
                      value={user.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="form-control"
                      value={user.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="username"
                      placeholder="User Name"
                      className="form-control"
                      value={user.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="PhoneNumber"
                      className="form-control"
                      value={user.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="mb-3 country-field">
                    <div className="country">
                      <div className="dropdown">
                        <div
                          className="btn dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <figure className="mb-0">
                            <img
                              src={PakImg}
                              alt="select country"
                              className="img-fluid"
                            />
                          </figure>
                          <span className="code">(+92)</span>
                        </div>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li className="dropdown-item">
                            <div className="country-code-wrap">
                              <figure className="mb-0">
                                <img
                                  src={PakImg}
                                  alt="select country"
                                  className="img-fluid"
                                />
                              </figure>
                              <span className="code">(+92)</span>
                            </div>
                          </li>
                          <li className="dropdown-item">
                            <div className="country-code-wrap">
                              <figure className="mb-0">
                                <img
                                  src={PakImg}
                                  alt="select country"
                                  className="img-fluid"
                                />
                              </figure>
                              <span className="code">(+92)</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="PhoneNumber"
                        className="form-control"
                        value={user.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div> */}
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={user.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="referralCode"
                      placeholder="Referral Code"
                      className="form-control"
                      value={user.referralCode}
                      onChange={handleChange}
                    />
                  </div>
                  {errors ? (
                    <div style={{ color: "#FE6E00" }} className="alert alert-danger"> {errors} </div>
                  ) :
                    ("")
                  }
                  <div className="d-block">
                    {/* <Link
                      to="/login"
                      type="submit"
                      className="btn w-100 form-btn text-capitalize"
                    >
                      next
                    </Link> */}
                    <button type="button" className="btn w-100 form-btn text-capitalize" onClick={handleSubmit}>Register</button>
                  </div>
                </form>
                <div className="d-flex align-items-center justify-content-center d-none">
                  <div className="form-checkbox d-flex flex-column">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I agree to receive email updates from Bitwhale
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        I agree to share data for marketing purposes
                      </label>
                    </div>
                  </div>
                </div>
                <div className="outline-button">
                  <Link to="/login" className="outline-btn">
                    New User? Login
                  </Link>
                </div>
              </Tab>
              {/* <Tab eventKey="profile" title="2. Account verification">
                <form className="account-form wrap-account-form">
                  <div>
                    <div className="input-group buttonInside mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone verification code"
                        aria-label="Email verification code"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className="btn outline-btn-blue text-capitalize"
                        type="button"
                        id="button-addon2"
                      >
                        get code
                      </button>
                    </div>
                    <div className="input-group buttonInside mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone verification code"
                        aria-label="Phone verification code"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className="btn outline-btn-blue text-capitalize"
                        type="button"
                        id="button-addon2"
                      >
                        get code
                      </button>
                    </div>
                  </div>
                  <div className="d-block">
                    <Link
                      to="/account-created"
                      type="submit"
                      className="btn w-100 form-btn text-capitalize"
                    >
                      submit
                    </Link>
                  </div>
                </form>
              </Tab> */}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterInfo;
