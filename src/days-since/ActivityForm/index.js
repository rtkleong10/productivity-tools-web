import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import ColorSelect from '../../components/ColorSelect';

export default class ActivityForm extends Component {
	state = {
		title: "",
		description: "",
		frequency: "",
		color: null,
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
			description,
			frequency,
			color,
		} = this.state;

		this.props.onSubmit({
			title,
			description,
			frequency,
			color,
		});
	}

	render() {
		const {
			title,
			description,
			frequency,
			color,
		} = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input id="title" name="title" type="text" onChange={this.handleChange} value={title} />
				</div>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<textarea id="description" name="description" onChange={this.handleChange} value={description} />
				</div>
				<div className="form-group">
					<label htmlFor="frequency">Frequency</label>
					<input id="frequency" name="frequency" type="number" min={1} onChange={this.handleChange} value={frequency} />
				</div>
				<div className="form-group">
					<label htmlFor="color">Color</label>
					<ColorSelect id="color" name="color" onChange={this.handleColorChange} value={color} />
				</div>
				<Button icon={faPaperPlane}>Submit</Button>
			</form>
		);
	}
}

ActivityForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};