import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import ColorSelect from '../../components/ColorSelect';
import { durationStrToMMss } from '../../utils/time';

export default class CycleForm extends Component {
	state = {
		title: "",
		duration: "",
		color: undefined,
	}

	reset = cycle => {
		if (cycle) {
			const {
				title,
				duration,
				color,
			} = cycle;

			this.setState({
				title,
				duration: durationStrToMMss(duration),
				color,
			});

		} else {
			this.setState({
				title: "",
				duration: "",
				color: undefined,
			});
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	handleColorChange = color => {
		this.setState({
			color: color,
		});
	}

	handleSubmit = e => {
		e.preventDefault();

		const {
			title,
			duration,
			color,
		} = this.state;

		this.props.onSubmit({
			title,
			duration,
			color,
		});
	}

	render() {
		const {
			title,
			duration,
			color,
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
				<div className="form-group">
					<label htmlFor="duration">Duration</label>
					<p className="small">Format: mm:ss, ss</p>
					<input
						id="duration"
						name="duration"
						type="text"
						maxLength="200"
						onChange={this.handleChange}
						value={duration}
						pattern="^\d+(:\d+)?$"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="color">Color</label>
					<ColorSelect
						name="color"
						onChange={this.handleColorChange}
						value={color}
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
