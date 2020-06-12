import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
				<div className="form-group">
					<label>Email</label>
					<input name="email" type="email" onChange={this.handleChange} value={email} />
				</div>
				<div className="form-group">
					<label>Username</label>
					<input name="username" type="text" onChange={this.handleChange} value={username} />
				</div>
				<div className="form-group">
					<label>Password</label>
					<input name="password" type="password" onChange={this.handleChange} value={password} />
				</div>
				<div className="form-group">
					<label>Confirm Password</label>
					<input name="password2" type="password" onChange={this.handleChange} value={password2} />
				</div>
				<Button icon={faPaperPlane}>Submit</Button>
			</form>
		);
	}
}

SignupForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};