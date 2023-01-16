import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import Trade from '../../assets/images/Trade.png';

const TradeAnywhere = () => {
  return (
    <section className='trade-anywhere'>
        <Container fluid className="custom-box">
            <Row>
                <Col md={6} className="trade-anywhere-col">
                    <h3>Trade. Anywhere.</h3>
                    <p>Connecting you to crypto - Anytime, anywhere and on any device!</p>
                </Col>
                <Col md={6}>
                    <Image src={Trade} alt="" fluid />
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default TradeAnywhere