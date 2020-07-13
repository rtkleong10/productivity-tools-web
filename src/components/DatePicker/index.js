import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import 'react-day-picker/lib/style.css';

import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function DatePicker(props) {
	const format = "D MMMM YYYY"

	function parseDate(str, format) {
		return moment(str, format).toDate();
	}

	function formatDate(date, format) {
		return moment(date).format(format);
	}

	const {
		onChange,
		placeholder,
		required,
		...rest
	} = props;

	return (
		<div className="date-picker">
			<DayPickerInput
				formatDate={formatDate}
				parseDate={parseDate}
				format={format}
				placeholder={placeholder ? placeholder : ""}
				onDayChange={onChange}
				inputProps={{
					required,
					onKeyDown: e => { e.preventDefault()},
				}}
				{...rest}
			/>
			<FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
		</div>
	)
}
