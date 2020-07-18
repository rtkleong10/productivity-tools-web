import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faForward } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import ProgressCircle from '../ProgressCircle';
import { EVENT_TYPES, getFrequencyDisplay } from '../utils';
import { performEvent } from '../../redux/ducks/activityEvents';
import './index.scss';

function getLastEventTypeDisplay(last_event_type) {
	switch (last_event_type) {
		case EVENT_TYPES.COMPLETED:
			return "Last completed";
		
		case EVENT_TYPES.SKIPPED:
			return "Last skipped";
		
		default:
			return "Created"
	}
}

function getDaysSinceDisplay(days_since) {
	if (days_since < 0)
		return `${Math.abs(days_since)} days in the future`;
	else if (days_since === 0)
		return "today";
	else if (days_since === 1)
		return "yesterday";
	else if (days_since < 7)
		return `${days_since} days ago`;
	else if (days_since >= 7 && days_since < 14)
		return "last week";
	else if (Math.floor(days_since / 7) > 99)
		return ">99 weeks ago";
	else
		return `${Math.floor(days_since / 7)} weeks ago`;
}

export function ActivityItem(props) {
	const {
		id,
		title,
		days_since,
		frequency,
		color,
		last_event_type,
		todays_event,
		performEvent,
	} = props;
	
	var eventDisplay = (
		<div>
			<Button icon={faCheck} className="mr-10" onClick={() => performEvent(id, EVENT_TYPES.COMPLETED)} aria-label="Complete" />
			<Button color="white" icon={faForward} onClick={() => performEvent(id, EVENT_TYPES.SKIPPED)} aria-label="Skip" />
		</div>
	);

	if (todays_event) {
		switch (todays_event) {
			case EVENT_TYPES.COMPLETED:
				eventDisplay = <p className="todays-event"><FontAwesomeIcon className="mr-10" icon={faCheck} />Completed</p>
				break;

			case EVENT_TYPES.SKIPPED:
				eventDisplay = <p className="todays-event"><FontAwesomeIcon className="mr-10" icon={faForward} />Skipped</p>;
				break;

			default:
				break;
		}
	}

	if (frequency) {
		return (
			<div className="item activity-item">
				<ProgressCircle days_since={days_since} frequency={frequency} color={color} />
				<div>
					<div className="mb-10">
						<h4 className="mb-0">
							<Link to={`/days-since/${id}`}>{title}</Link>
						</h4>
						<p>{getFrequencyDisplay(frequency)} • {getLastEventTypeDisplay(last_event_type)} {getDaysSinceDisplay(days_since)}</p>
					</div>
					{eventDisplay}
				</div>
			</div>
		);

	} else {
		return (
			<div className="item activity-item">
				<div>
					<div className="mb-10">
						<h4 className="mb-0">
							<Link to={`/days-since/${id}`}>{title}</Link>
						</h4>
						<p>{getLastEventTypeDisplay(last_event_type)} {getDaysSinceDisplay(days_since)}</p>
					</div>
					{eventDisplay}
				</div>
			</div>
		);
	}
}

ActivityItem.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	days_since: PropTypes.number.isRequired,
	frequency: PropTypes.number,
	color: PropTypes.string.isRequired,
	last_event_type: PropTypes.number,
	todays_event: PropTypes.number,
}

const dispatchers = {
	performEvent,
};

export default connect(() => ({}), dispatchers)(ActivityItem);
