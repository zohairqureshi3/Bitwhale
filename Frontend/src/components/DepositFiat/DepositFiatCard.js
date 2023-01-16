import React from 'react';
import Card1 from '../../assets/images/card-1.svg';
import Card2 from '../../assets/images/card-2.svg';
import Card3 from '../../assets/images/card-3.svg';

const DepositFiatCard = () => {
  return (
    <section className="deposit-cards">
            <div className="container-fluid user-screen">
                <div className="mb-80">
                    <h4>Fund Your Account with Fiat Currencies</h4>
                </div>
                <div className="row wrap-deposit-cards mb-5">
                    <div className="col-md-4 mb-md-0">
                        <div className="card">
                            <figure className="mb-lg-4">
                                <img src={Card2} alt="Fiat Currencies" className="img-fluid" />
                            </figure>
                            <div className="card-body">
                                <h3 className="mb-4">Easy for both new and experienced trader</h3>
                                <p className="p2">You will find that our fiat currency funding options for a seamless experience that will have you trading in as little as 24 hours from the time of your deposit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-md-0">
                        <div className="card">
                            <figure className="mb-lg-4 mb-3">
                                <img src={Card3} alt="Fiat Currencies" className="img-fluid" />
                            </figure>
                            <div className="card-body">
                                <h3 className="mb-4">Bitwhale offers Deposit with fiat currency</h3>
                                <p className="p2">Fundind with Euros (EUR), US dollars (USD) and other fiat currencies, all with minimal fees.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-md-0 mb-3">
                        <div className="card">
                            <figure className="mb-lg-4 mb-3">
                                <img src={Card1} alt="Fiat Currencies" className="img-fluid" />
                            </figure>
                            <div className="card-body">
                                <h3 className="mb-4">Bitwhale supports the following currencies</h3>
                                <p className="p2">AUD, EUR, HKD, KZT, NOK, PEN, RUB, TRY, UAH, UGX.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default DepositFiatCard