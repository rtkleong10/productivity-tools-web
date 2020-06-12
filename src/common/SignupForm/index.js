import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';

export default class SignupForm extends Component {
	state = {
		email: "",
		username: "",
		password: "",
		password2: "",
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = e => {
		e.preventDefault();

		const {
			email,
			username,
			password,
			password2,
		} = this.state;

		if (password === password2) {
			this.props.onSubmit({
				email,
				username,
				password,
			});

		} else {

			alert("Passwords don't match");
		}
	}

	render() {
		const {
			email,
			username,
			password,
			password2,
		} = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Email
					<input name="email" type="email" onChange={this.handleChange} value={email} />
				</label>
				<label>
					Username
					<input name="username" type="text" onChange={this.handleChange} value={username} />
				</label>
				<label>
					Password
					<input name="password" type="password" onChange={this.handleChange} value={password} />
				</label>
				<label>
					Confirm Password
					<input name="password2" type="password" onChange={this.handleChange} value={password2} />
				</label>
				<Button>Submit</Button>
			</form>
		);
	}
}

SignupForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};