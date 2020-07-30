import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import { connect } from 'react-redux';

import { listTimezones, selectTimezones, selectTimezonesLoading, selectTimezonesError } from '../../redux/ducks/timezones'; 

export function TimezoneSelect(props) {
	const {
		timezones,
		timezonesLoading,
		listTimezones,
	} = props;

	useEffect(() => {
		listTimezones()
	}, [listTimezones]);
	
	let timezoneOptions = [];
	
	if (timezones) {
		timezoneOptions = timezones.map(timezone => {	
			return {
				value: timezone,
				label: timezone.replace("_", " "),
			};
		})
	}

	return (
		<Select
			placeholder="Select a timezone"
			isLoading={timezonesLoading}
			options={timezoneOptions}
			{...props}
			/>
	);
}

TimezoneSelect.propTypes = {
	timezones: PropTypes.arrayOf(PropTypes.string).isRequired,
	timezonesLoading: PropTypes.bool.isRequired,
	timezonesError: PropTypes.object,

	listTimezones: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	timezones: selectTimezones(state),
	timezonesLoading: selectTimezonesLoading(state),
	timezonesError: selectTimezonesError(state),
});

const dispatchers = {
	listTimezones,
};

export default connect(mapStateToProps, dispatchers)(TimezoneSelect);
