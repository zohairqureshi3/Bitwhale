import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
// import Footer from "../LandingPages/Footer/Footer";

const PublicLayout = ({ title, children }) => {

  useEffect(() => {
    if (title)
      document.title = title;
    else
      document.title = "BitWhale";
  }, [title]);

  return (
    <div className="wrapper">
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};
export default PublicLayout;
