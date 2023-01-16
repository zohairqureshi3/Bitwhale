import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/logo.svg';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { rest } from "lodash";
import axios from "axios";

const PrivateLayout = ({ title, children }) => {
	const [isActive, setActive] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState([]);

	const toggleClass = () => {
		setActive(!isActive);
	};

	useEffect(() => {
		if (title)
			document.title = title;
		else
			document.title = "BitWhale";
	}, [title]);

	useEffect(() => {
		if (!localStorage.uToken) {
			window.location.href = '/';
		}
		// if (localStorage.userType == 'admin') {
		// 	axios.get("/admin/logout").then((errors) => { });
		// 	localStorage["userType"] = 'user';
		// } else {
		// 	localStorage["userType"] = 'user';
		// }
	}, []);

	return (
		localStorage.uToken ?
			<div className="wrapper">
				<Header />
				{children}
			</div>
			: null

	);
};
export default PrivateLayout;
