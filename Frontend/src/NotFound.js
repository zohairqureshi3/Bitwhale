import React from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
    return (
        <div className="notfound-sec">
            <div className="container">
                <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="col-md-8">
                        <div className="text-center img-wrapper">
                            <h1> 404 </h1>
                        </div>
                        <div className="content-wrapper d-flex flex-column align-items-center">
                            <h2 className="text-uppercase">OOPS! Page Not Found</h2>
                            <Link to="/" className="btn btn-primary"> <span> Back to Home </span> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
