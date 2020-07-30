import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
	);
}

SignupPage.propTypes = {
	signup: PropTypes.func.isRequired,
}

const dispatchers = {
	signup,
};

export default connect(() => ({}), dispatchers)(SignupPage);
