import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import { Container, Image, Row, Col } from "react-bootstrap";
import UserImg from "../../assets/images/user-pic.png";

const Dashboard = () => {

  const [user, setUser] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem('userInfo');
    const loginUser = JSON.parse(userData);
    setUser(loginUser);
  }, []);

  return (
    <>
      <section className="user-dashboard">
        <Row>
          <ProfileSideBar />
          <Col lg={10}>
            <Container fluid>
              <div className="user-information d-flex">
                <div className="user-img">
                  <Image src={UserImg} alt="" fluid />
                </div>
                <div className="user-details d-flex">
                  <div>
                    <p>{user.username}</p>
                    <p>Last login time 2022-03-02 18:10:43</p>
                  </div>
                  <div style={{ marginLeft: "15px" }}>
                    <p>User ID: {user._id}</p>
                    <p>IP: 202.166.170.107</p>
                  </div>
                </div>
              </div>
              <div className="balance-details">
                <h3>Balance Details</h3>
                <p>Account balance:</p>
                <h4>
                  0.00000000 <span style={{ fontSize: "12px" }}>BTC</span>
                </h4>
                <p>Estimated Value:</p>
                <h4>$0.00</h4>
              </div>
            </Container>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default Dashboard;
