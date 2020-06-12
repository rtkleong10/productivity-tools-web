import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet";

import Button from '../../components/Button';
import { logout } from '../../redux/ducks/auth';

export class LogoutPage extends Component {
	componentDidMount() {
		this.props.logout();
	}

	render() {
		return (
			<div className="container">
				<Helmet>
					<title>Logged Out</title>
				</Helmet>
				<h1>You have logged out.</h1>
				<p>We hope you come back soon!</p>
				<Button isLink={true} to="/" icon={faChevronLeft}>Return to Home</Button>
			</div>
		);
	}
}

const dispatchers = {
    logout,
};

LogoutPage.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default connect(() => ({}), dispatchers)(LogoutPage);
