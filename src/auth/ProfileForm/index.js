import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import TimezoneSelect from '../../components/TimezoneSelect';

export default class LoginForm extends Component {
	state = {
		timezone: null,
	}

	componentDidMount() {
		const {
			profile: {
				timezone,
			}
		} = this.props;
		
		this.setState({
			timezone,
		})
	}

	handleTimezoneChange = timezone => {
		this.setState({
			timezone,
		});
	}

	handleSubmit = e => {
		e.preventDefault();

		const {
			timezone,
		} = this.state;

		this.props.onSubmit({
			timezone: timezone.value,
		});
	}

	render() {
		const {
			timezone,
		} = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label htmlFor="timezone">Timezone</label>
					<TimezoneSelect
						id="timezone"
						onChange={this.handleTimezoneChange}
						value={timezone}
						required
						/>
				</div>
				<Button icon={faSave}>Save</Button>
			</form>
		);
	}
}

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};