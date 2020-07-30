import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from '../LoginForm';
import { authLogin } from '../../redux/ducks/auth';

export function LoginPage(props) {
	const {
		authLogin
	} = props;

	return (
		<div className="container">
			<Helmet>
				<title>Log In</title>
			</Helmet>
			<h1>Log In</h1>
			<div className="box my-20">
				<LoginForm onSubmit={authLogin} />
			</div>
			<p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
		</div>
	);
}

LoginPage.propTypes = {
    authLogin: PropTypes.func.isRequired,
};

const dispatchers = {
    authLogin,
};

export default connect(() => ({}), dispatchers)(LoginPage);
