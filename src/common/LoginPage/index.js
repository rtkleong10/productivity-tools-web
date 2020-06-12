import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { authUrl } from '../../utils/constants';
import LoginForm from '../LoginForm';
import { Link } from 'react-router-dom';

export default function LoginPage() {
	function handleSubmit({ username, password }) {
		axios.post(
			`${authUrl}/jwt/create`,
			{
				username,
				password,
			}
		)
			.then(res => {
				const {
					access,
					refresh,
				} = res.data;
				Cookies.set("access", access);
				Cookies.set("refresh", refresh);
			})
	}

	return (
		<div className="container">
			<h1>Login</h1>
			<div className="box my-20">
				<LoginForm onSubmit={handleSubmit} />
			</div>
			<p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
		</div>
	);
}