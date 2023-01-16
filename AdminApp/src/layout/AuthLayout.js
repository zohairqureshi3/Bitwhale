import React, { useEffect } from "react";

const AuthLayout = ({ title, children }) => {

  useEffect(() => {
    if (title)
      document.title = title;
    else
      document.title = "BitWhale";
  }, [title]);

  useEffect(() => {
    if (localStorage.token) {
      window.location.href = '/admin/';
    }
  }, []);

  return <div className="auth-layout">
    {children}
  </div>
};

export default AuthLayout;
