import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default class CycleForm extends Component {
	state = {
		title: "",
	}

	reset = cycle => {
		if (cycle) {
			const {
				title,
			} = cycle;

			this.setState({
				title,
			});

		} else {
			this.setState({
				title: "",
			});
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit = e => {
		e.preventDefault();

		const {
			title,
		} = this.state;

		this.props.onSubmit({
			title,
		});
	}

	render() {
		const {
			title,
		} = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						id="title"
						name="title"
						type="text"
						maxLength="200"
						onChange={this.handleChange}
						value={title}
						required
					/>
				</div>
				<Button icon={faPaperPlane}>Submit</Button>
			</form>
		);
	}
}

CycleForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};