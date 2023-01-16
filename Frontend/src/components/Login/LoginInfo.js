import React, { useState, useEffect } from "react";
import Qrcode from "../../assets/images/fill-qrcode.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, resendVerification } from "../../redux/auth/authActions";

const LoginInfo = () => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth?.user);
  const [errors, setErrors] = useState("");
  const [user, setUser] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");
  const [resend, setResend] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { email, password } = user;
    if (email === "") {
      setErrors("Please enter email first!");
    } else if (!email.match(regexp)) {
      setErrors("Invalid email!");
    } else if (password === "") {
      setErrors("Password is required!");
    } else {
      setErrors("");
      const data = {
        email: user.email,
        password: user.password,
      };
      dispatch(LoginUser(data));
    }
  };

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    if (params.get('status')) {
      if (params.get('status') == '200')
        setStatus(1)
      else
        setStatus(2)
    }
    if (params.get('message')) {
      setMessage(params.get('message'))
    }
    if (params.get('resend')) {
      setResend(params.get('resend'))
    }
    window.history.pushState({}, document.title, window.location.pathname);
  }, [])

  const resendEmail = () => {
    console.log(resend);
    dispatch(resendVerification(resend))
  }

  return (
    <section className="account-login">
      {status ?
        <div className={"bar " + (status === 1 ? "bg-green" : "bg-red")}>
          <span className="bar-content d-flex justify-content-center align-items-center">
            <p className="mb-0">
              {message}{"   "}
              {resend ?
                <button type="button" onClick={() => resendEmail()} className="btn form-btn text-capitalize">
                  Resend Token
                </button>
                : ""
              }
            </p>
          </span>
        </div>
        : ""
      }
      <div className="bar">
        <span className="bar-content d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faLock} style={{ marginRight: "5px" }} />
          <p className="mb-0">
            URL verification:
            <Link to="" className="dot ms-1 text-decoration-none">
              https://accounts.Bitwhale.com
            </Link>
          </p>
        </span>
      </div>
      <div className="text-center bottom-space mb-lg-0 container-fluid custom-box">
        <h3 className="text-capitalize mb-lg-3">bitwhale account login</h3>
        <p>Welcome back! Login with your Email
          {/* , Phone Number or QR code */}
        </p>
      </div>
      <div className="account-bg">
        <div className="banner">
          <div className="container-fluid custom-box">
            <div className="row">
              <div className="col-lg-6 mb-lg-0 mb-3 d-none">
                <div className="d-flex align-items-center justify-content-center h-100">
                  <figure className="mb-0 qr-code">
                    <img src={Qrcode} alt="QR code" className="img-fluid" />
                  </figure>
                  <div className="small-div">
                    <span className="scan-text2 d-block mb-2 dot">
                      Login with QR code
                    </span>
                    <p>
                      Scan this code with the Bitwhale mobile app to login
                      instantly.
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-5 offset-lg-1 mb-lg-0 mb-3">  uncomment when showing QR code   */}
              <div className="col-lg-12 mb-lg-0 mb-3">
                <form className="account-form remove-this">
                  <div className="mb-3">
                    <input
                      type="email"
                      placeholder="Email/PhoneNumber"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
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
                  <div className="mb-3">
                    {/* <Link to="/overview" type="submit" className="btn w-100 form-btn text-capitalize">log in</Link> */}
                    <button type="button" className="btn w-100 form-btn text-capitalize" onClick={handleSubmit}>
                      Login
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Link
                      to="/forgot-password"
                      className="btn form-black-btn text-capitalize"
                    >
                      forgot password?
                    </Link>
                    <Link to="/register" className="btn form-theme-btn">
                      Register now
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid custom-box">
        <div className="footer-bottom">
          <p className="copyright text-center mb-0">©2022 Bitwhale.com</p>
        </div>
      </div>
    </section>
  );
};

export default LoginInfo;
