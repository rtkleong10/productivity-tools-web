import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Button from '../../components/Button';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Select from '../../components/Select';
import { EVENT_TYPE_OPTIONS, EVENT_TYPES } from '../utils';
import DatePicker from '../../components/DatePicker';

export default class EventForm extends Component {
	state = {
		event_type: "",
		date: "",
		description: "",
	}

	reset = event => {
		if (event) {
			const {
				event_type,
				date,
				description,
			} = event;

			this.setState({
				event_type,
				date: moment(date, "YYYY-MM-DD").toDate(),
				description,
			});

		} else {
			this.setState({
				event_type: EVENT_TYPES.COMPLETED,
				date: new Date(),
				description: "",
			});
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleEventTypeChange = event_type => {
		this.setState({
			event_type,
		});
	}

	handleDateChange = date => {
		this.setState({
			date,
		});
	}

	handleSubmit = e => {
		e.preventDefault();

		const {
			event_type,
			date,
			description,
		} = this.state;

		this.props.onSubmit({
			event_type: event_type.value,
			date: moment(date).format("YYYY-MM-DD"),
			description,
		});
	}

	render() {
		const {
			event_type,
			date,
			description,
		} = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label htmlFor="event_type">Event Type</label>
					<Select
						id="event_type"
						onChange={this.handleEventTypeChange}
						value={event_type}
						options={EVENT_TYPE_OPTIONS}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="date">Date</label>
					<DatePicker
						value={date}
						onChange={this.handleDateChange}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<textarea
						id="description"
						name="description"
						onChange={this.handleChange}
						value={description}
					/>
				</div>
				<Button icon={faPaperPlane}>Submit</Button>
			</form>
		);
	}
}

EventForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};