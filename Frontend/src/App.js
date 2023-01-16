import React, { useEffect } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './assets/css/bitwhale.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from './NotFound';
import routes from './routes';
import axios from 'axios';

const App = (props) => {

    // const responseSuccessHandler = response => {
    //     return response;
    // };
    // const responseErrorHandler = error => {
    //     if (error.response.status === 401) {
    //         localStorage.removeItem('uToken');
    //         localStorage.removeItem('user_name');
    //         localStorage.removeItem('country');
    //         window.location.href = "/login";
    //     }

    //     return Promise.reject(error);
    // }
    // axios.interceptors.response.use(
    //     response => responseSuccessHandler(response),
    //     error => responseErrorHandler(error)
    // );

    // if (!localStorage.lang)
    //     localStorage['lang'] = 'en';


    return (
        <React.Fragment>
            <Router>
                <Routes>

                    {routes.map((route, index) => (
                        <Route exact={route.exact} path={route.path} element={<route.layout title={route.name}> <route.component /> </route.layout>} key={index} />
                    ))}

                    <Route path="*" element={<NotFound />} />

                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
