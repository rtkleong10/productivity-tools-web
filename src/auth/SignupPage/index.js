import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

import SignupForm from '../SignupForm';
import { signup } from '../../redux/ducks/auth';

export function SignupPage(props) {
	const {
		signup,
	} = props;

	return (
		<div className="container">
			<Helmet>
				<title>Sign Up</title>
			</Helmet>
			<h1>Sign Up</h1>
			<div className="box my-20">
				<SignupForm onSubmit={signup} />
			</div>
			<p>Already have an account? <Link to="/login">Log in here</Link></p>
		</div>
	)
}

const dispatchers = {
	signup,
};

export default connect(() => ({}), dispatchers)(SignupPage);
