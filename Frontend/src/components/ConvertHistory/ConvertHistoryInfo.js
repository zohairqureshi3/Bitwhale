import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDownload, faArrowDown, faSortDesc } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';


const ConvertHistoryInfo = () => {
  return (
    <section className="overview section-padding transection-history-section">
    <div className="row">
    
        <SideBar />


        <div className="col-lg-10">
        <div className="transaction-history fade-color">
                        <div className="transaction-history-heading-section convert-history d-flex justify-content-between">
                            <div className="convert-history-info">
                                <p className="mb-0">Convert</p>
                                <h3>Convert History</h3>
                            </div>    
                            <div className="share-link">
                                <a href="#" className="share-link-content d-flex align-items-center">
                                    <FontAwesomeIcon className='fa download-icon' icon={faDownload} />
                                    <p className="m-0">Export</p>
                                </a>
                            </div>
                        </div>
                        <form className="transaction-selection convert-selection d-flex">
                            <div className="transaction-selection-content">
                                <label>Date</label>
                                <div className="convert-calendar-content">
                                    <input type="date" className="convert-calendar" />
                                </div>
                                
                            </div>       
                            <div className="transaction-selection-content">    
                                <label>Wallet</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>All</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <FontAwesomeIcon icon={faSortDesc} className="fa arrow-down" />
                            </div>    
                            <div className="transaction-selection-content">    
                                <label>Pair</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>All</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <FontAwesomeIcon icon={faSortDesc} className="fa arrow-down" />
                            </div>  
                            <div className="transaction-selection-content-buttons d-flex align-self-end">
                                <div className="inline-block">
                                    <a href="" className="btn form-btn text-capitalize">search
                                    </a>
                                </div>
                                <button className="transparent-btn">Reset</button>
                            </div>      
                        </form>
                       
                        <div className="responsive-table table-responsive">
                            <table className="table table-hover deposit-table convert-history-table">
                                <thead className="deposit-table-header">
                                    <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Wallet</th>
                                    <th scope="col">Pair</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">From</th>
                                    <th scope="col">To</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Update Date</th>
                                    <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">2022-02-08 11:19:26</th>
                                    <td>Spot</td>
                                    <td>BNBBUSD</td>
                                    <td>Market</td>
                                    <td>55B USD</td>
                                    <td>0.12345042 BNB</td>
                                    <td>1 BUSD-0.00224455 BNB 1 BNB=445.523 BUSD</td>
                                    <td>2022-02-08 11:19:28</td>
                                    <td><button className="green-btn">Successful</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2022-02-08 11:19:26</th>
                                        <td>Spot</td>
                                        <td>BNBBUSD</td>
                                        <td>Market</td>
                                        <td>55B USD</td>
                                        <td>0.12345042 BNB</td>
                                        <td>1 BUSD-0.00224455 BNB 1 BNB=445.523 BUSD</td>
                                        <td>2022-02-08 11:19:28</td>
                                    <td><button className="green-btn">Successful</button></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2022-02-08 11:19:26</th>
                                        <td>Spot</td>
                                        <td>BNBBUSD</td>
                                        <td>Market</td>
                                        <td>55B USD</td>
                                        <td>0.12345042 BNB</td>
                                        <td>1 BUSD-0.00224455 BNB 1 BNB=445.523 BUSD</td>
                                        <td>2022-02-08 11:19:28</td>
                                    <td><button className="green-btn">Successful</button></td>
                                    </tr>
                                </tbody>    
                            </table>
                        </div>
                    </div>
        </div>
        </div>

        
</section>
  )
}

export default ConvertHistoryInfo