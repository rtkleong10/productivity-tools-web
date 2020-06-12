import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';

export default class LoginForm extends Component {
	state = {
		username: "",
		password: "",
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = e => {
		e.preventDefault();

		const {
			username,
			password,
		} = this.state;

		this.props.onSubmit({
			username,
			password,
		});
	}

	render() {
		const {
			username,
			password,
		} = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input name="username" id="username" type="text" onChange={this.handleChange} value={username} />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input name="password" id="password" type="password" onChange={this.handleChange} value={password} />
				</div>
				<Button>Submit</Button>
			</form>
		);
	}
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};