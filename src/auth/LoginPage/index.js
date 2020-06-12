import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from '../LoginForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogin } from '../../redux/ducks/auth';

export function LoginPage(props) {
	const {
		authLogin
	} = props;

	return (
		<div className="container">
			<h1>Log In</h1>
			<div className="box my-20">
				<LoginForm onSubmit={authLogin} />
			</div>
			<p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
		</div>
	);
}

const dispatchers = {
    authLogin,
};

LoginPage.propTypes = {
    authLogin: PropTypes.func.isRequired,
};

export default connect(() => ({}), dispatchers)(LoginPage);
