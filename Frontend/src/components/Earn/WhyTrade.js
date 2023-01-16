import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import Binance from '../../assets/images/binance.png';
import image1 from '../../assets/images/1.svg';
import image2 from '../../assets/images/2.svg';
import image3 from '../../assets/images/3.svg';
import image4 from '../../assets/images/4.svg';



const WhyTrade = () => {
    return (
        <section className='why-trade'>
            <Container fluid className="custom-box">
                <h2>Why Trade with Us</h2>
                <Row>
                    <Col md={6} className='why-trade-wraper-col'>
                        <div className='why-trade-wraper'>
                            <div className='img-w'><Image src={image3} alt="" fluid /></div>
                            <div className='content'>
                                <h3>Extensive Selection of Crypto Futures Products</h3>
                                <h3>Choose from over 90 contracts including USDT and Coin-margined instruments.</h3>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className='why-trade-wraper-col'>
                        <div className='why-trade-wraper'>
                            <div className='img-w'><Image src={image1} alt="" fluid /></div>
                            <div className='content'>
                                <h3>User-centricity</h3>
                                <h3>Innovative products, enhanced user experience, having a seamless and stable performance that users can rely on. Includes 24/7 global customer support to assist you.</h3>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className='why-trade-wraper-col'>
                        <div className='why-trade-wraper'>
                            <div className='img-w'><Image src={image2} alt="" fluid /></div>
                            <div className='content'>
                                <h3>Industry-Leading Matching Engine</h3>
                                <h3>Our stable and fast matching engine can manage up to 100,000 orders per second, with minimal latency of 5 milliseconds.</h3>
                            </div>
                        </div>
                    </Col>

                    <Col md={6} className='why-trade-wraper-col'>
                        <div className='why-trade-wraper'>
                            <div className='img-w'><Image src={image4} alt="" fluid /></div>
                            <div className='content'>
                                <h3>Trade On-The-Go</h3>
                                <h3>Get fast and reliable access from your smartphone. Android and iOS now supported!</h3>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default WhyTrade