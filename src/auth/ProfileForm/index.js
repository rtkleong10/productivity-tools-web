import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import TimezoneSelect from '../../components/TimezoneSelect';
import { selectProfileUpdateLoading } from '../../redux/ducks/profile';

export class ProfileForm extends Component {
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
			timezone,
		});
	}

	render() {
		const {
			profileUpdateLoading,
		} = this.props;

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
				{
					profileUpdateLoading
						? <Button icon={faSpinner} color="faded-grey" disabled={true}>Saving</Button>
						: <Button icon={faSave}>Save</Button>
				}
			</form>
		);
	}
}

ProfileForm.propTypes = {
	profile: PropTypes.shape({
		timezone: PropTypes.string.isRequired,
	}),
	onSubmit: PropTypes.func.isRequired,

	profileUpdateLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
	profileUpdateLoading: selectProfileUpdateLoading(state),
});

export default connect(mapStateToProps, {})(ProfileForm);
