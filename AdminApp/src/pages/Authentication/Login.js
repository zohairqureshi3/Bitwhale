import React, { useState } from "react";
import Header from '../../layout/Header';
import { useDispatch } from 'react-redux';
import { adminLogin } from "../../redux/auth/authActions";
import { withRouter, Link } from "react-router-dom";

const LoginPage = (props) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState("")
    const [user, setUser] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { email, password } = user
        if (email === "") {
            setErrors("Please enter email first!")
        } else if (!email.match(regexp)) {
            setErrors("Invalid email!");
        } else if (password === "") {
            setErrors("Password is required!");

        } else {
            setErrors("");
            const data = {
                email: user.email,
                password: user.password
            }
            dispatch(adminLogin(data));
        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };


    return (
        <>
            <Header />
            <div className="col-lg-12 col-md-12 login-page">
                <div className="content-wrapper">
                    <div className="content-box auth-box">
                        <h3>Login User</h3>
                        <form>
                            <div className="form-group col-md-12">
                                <label className="control-label">Email</label>
                                <input type="email" className="form-control" onChange={handleChange}
                                    name="email" value={user.email} placeholder="Enter email" />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="control-label">Password</label>
                                <input type="password" required="required" className="form-control" onChange={handleChange}
                                    name="password" value={user.password} placeholder="Enter password" />
                            </div>
                            {errors ? (
                                <div
                                    style={{ color: "#FE6E00" }}
                                    className="alert alert-danger"
                                >
                                    {errors}
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="login-page-buttons">
                                <button className="btn-default w-100 hvr-bounce-in nav-button me-2" onClick={handleSubmit}>Login</button>
                            </div>
                            <br />
                            <Link to='/admin/forget-password-email'>Forget Password</Link>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(LoginPage)
