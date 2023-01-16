import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import StatsIcon from '../../assets/images/stats-icon.svg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const PriceChart = () => {

    const [currencies, setCurrencies] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getCurrencies();
    }, [])

    const getCurrencies = async () => {
        let prices = [];
        let symbols = ['BTCUSDT', 'XRPUSDT', 'ETHBTC', 'ETHUSDT', 'XRPETH', 'XRPBTC']
        for (let i = 0; i < symbols.length; i++) {
            await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbols[i]}`).then((res) => {
                prices.push(res.data)
            })
        }
        setCurrencies(prices);
        setLoader(false)
    }

    const settings = {
        autoplay: false,
        infinite: true,
        autoplaySpeed: 500,
        speed: 1500,
        button: false,
        arrows: false,
        dots: true,
        pauseOnHover: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1440,
            settings: {
                slidesToShow: 5
            }
        }, {
            breakpoint: 1000,
            settings: {
                slidesToShow: 4,
            }
        }, {
            breakpoint: 700,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            }
        }, {
            breakpoint: 320,
            settings: {
                slidesToShow: 1,
            }
        }]
    };
    return (

        <section className="price-chart">
            <Container fluid className='custom-box'>
                <div className="price-mb">
                    <div className="price-chart-bg">
                        <div className="circle">
                            <div className="blue-circle"></div>
                            <div className="pink-circle"></div>
                        </div>
                        <Slider {...settings} className="mb-0 carousal">
                            {currencies?.length > 0 && currencies.map((item, index) => {
                                return (
                                    <div className="d-flex justify-content-center" key={index}>
                                        {item.priceChangePercent < 0 ?

                                            <figure className="mb-0 carousal-icon">
                                                <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_pu87lx4v.json" background="transparent" speed="1" loop autoplay>
                                                </lottie-player>
                                            </figure>
                                            :
                                            <figure className="mb-0 carousal-icon">
                                                <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_gulkg57z.json" background="transparent" speed="1" loop autoplay>
                                                </lottie-player>
                                            </figure>
                                        }
                                        <div>
                                            <span className={item.priceChangePercent < 0 ? "rate-span red d-inline-block" : "rate-span green d-inline-block"}>{item.priceChangePercent}%</span>
                                            <span className="price-span d-block">{item.symbol}</span>
                                            <span className="capital-span d-block">{item.askPrice.slice(0, 8)}<sub className="sub-text">${item.askPrice.slice(0, 8)}</sub></span>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default PriceChart