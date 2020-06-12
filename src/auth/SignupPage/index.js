import React from 'react';
import { Link } from 'react-router-dom';

import SignupForm from '../SignupForm';

export default function SignupPage() {
	function handleSubmit({ email, username, password }) {
		
	}

	return (
		<div className="container">
			<h1>Sign Up</h1>
			<div className="box my-20">
				<SignupForm onSubmit={handleSubmit} />
			</div>
			<p>Already have an account? <Link to="/login">Log in here</Link></p>
		</div>
	)
}
