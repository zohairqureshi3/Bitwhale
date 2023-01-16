import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
// import "swiper/css/swiper.css";
// import "swiper/css/virtual";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";
import Binance from "../../assets/images/binance.png";
import BTC from '../../assets/images/btc.svg';
import ETH from '../../assets/images/eth.svg';
import USDT from '../../assets/images/usdt.svg';
import XRP from '../../assets/images/xrp.svg';

const TradeCryptoFutures = () => {
  
  const slides = Array.from({ length: 5 }).map(
    (el, index) => `Slide ${index + 1}`
  );

  return (
    <section className="trade-crypto-feature">
      <Container fluid className="custom-box">
        <h2>Trade Crypto Futures</h2>
        {/* <Link to="" className="btn-register text-capitalize open-account">
          Open Account
        </Link>
        <p className="last-login">Last login: 2022-02-28</p> */}

        {/* <Swiper
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          direction={"vertical"}
          modules={[Virtual, Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          virtual
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide key={slideContent} virtualIndex={index}>
              <div className="future-container">
                <div className="futures">
                  <p>
                    ADAUSD <span className="green-text">-1.65%</span>{" "}
                  </p>
                  <p>Perpetual</p>
                  <p>3777.6</p>
                </div>
                <div className="futures">
                  <p>
                    ADAUSD <span className="green-text">-1.65%</span>{" "}
                  </p>
                  <p>Perpetual</p>
                  <p>3777.6</p>
                </div>
                <div className="futures">
                  <p>
                    ADAUSD <span className="green-text">-1.65%</span>{" "}
                  </p>
                  <p>Perpetual</p>
                  <p>3777.6</p>
                </div>
                <div className="futures">
                  <p>
                    ADAUSD <span className="green-text">-1.65%</span>{" "}
                  </p>
                  <p>Perpetual</p>
                  <p>3777.6</p>
                </div>
                <div className="futures">
                  <p>
                    ADAUSD <span className="green-text">-1.65%</span>{" "}
                  </p>
                  <p>Perpetual</p>
                  <p>3777.6</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}

        <Row className="futures-trade-now-container">
          <Col md={3} className="mb-2">
            <div className="futures-trade-now">
              <div className="image-coin">
                <Image src={BTC} alt="" fluid />
                <Image className="future-image2" src={USDT} alt="" fluid />
              </div>
              <h3>USDⓈ-M Futures</h3>
              <p>Perpetual or Quarterly Contracts settled in USDT.</p>
              <Link to={`/trade/BTCUSDT`} className="btn-register text-capitalize">
                Trade Now
              </Link>
            </div>
          </Col>
          <Col md={3} className="mb-2">
            <div className="futures-trade-now">
              <div className="image-coin">
                <Image src={XRP} alt="" fluid />
                <Image className="future-image2" src={USDT} alt="" fluid />
              </div>
              <h3>COIN-M Futures</h3>
              <p>Perpetual or Quarterly Contracts settled in Cryptocurrency.</p>
              <Link to={`/trade/XRPUSDT`} className="btn-register text-capitalize">
                Trade Now
              </Link>
            </div>
          </Col>
          <Col md={3} className="mb-2">
            <div className="futures-trade-now">
              <div className="image-coin">
                <Image src={ETH} alt="" fluid />
                <Image className="future-image2" src={BTC} alt="" fluid />
              </div>
              <h3>BitWhale Leveraged Tokens</h3>
              <p>Enjoy increased leverage without risk of liquidation.</p>
              <Link to={`/trade/ETHBTC`} className="btn-register text-capitalize">
                Learn More
              </Link>
            </div>
          </Col>
          <Col md={3} className="mb-2">
            <div className="futures-trade-now">
              <div className="image-coin">
              <Image src={ETH} alt="" fluid />
                <Image className="future-image2" src={USDT} alt="" fluid />
              </div>
              <h3>BitWhale Options</h3>
              <p>
                Crypto Options made simple. Limited risk and unlimited profits.
              </p>
              <Link to={`/trade/ETHUSDT`} className="btn-register text-capitalize">
                Learn More
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TradeCryptoFutures;
