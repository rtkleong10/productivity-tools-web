import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SignupForm from '../SignupForm';
import { authUrl } from '../../utils/constants';

export default function SignupPage() {
	function handleSubmit({ email, username, password }) {
		axios.post(
			`${authUrl}/users`,
			{
				email,
				username,
				password,
			}
		)
			.then(res => {
				console.log(res.data);
			});
	}

	return (
		<>
			<h1>Sign Up</h1>
			<SignupForm onSubmit={handleSubmit} />
			<p>Already have an account? <Link to="/login">Log in here</Link></p>
		</>
	)
}
