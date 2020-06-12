import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faForward } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import ProgressCircle from '../ProgressCircle';
import { EVENTS, getFrequencyDisplay } from '../utils';
import './index.scss';

function getDaysSinceDisplay(days) {
	if (days === 0)
		return "today";
	else if (days === 1)
		return "yesterday";
	else if (days < 7)
		return `${days} days ago`;
	else if (days >= 7 && days < 14)
		return "last week";
	else if (Math.floor(days / 7) > 99)
		return ">99 weeks ago";
	else
		return `${Math.floor(days / 7)} weeks ago`;
}

export default function ActivityElement(props) {
	const {
		id,
		title,
		daysSince,
		frequency,
		color,
		todaysEvent,
	} = props;

	var eventDisplay = (
		<div>
			<Button icon={faCheck} className="mr-10"></Button>
			<Button color="white" icon={faForward}></Button>
		</div>
	);

	if (todaysEvent) {
		switch (todaysEvent) {
			case EVENTS.COMPLETED:
				eventDisplay = <p className="todays-event"><FontAwesomeIcon className="mr-10" icon={faCheck} />Completed</p>
				break;
			
			case EVENTS.SKIPPED:
				eventDisplay = <p className="todays-event"><FontAwesomeIcon className="mr-10" icon={faForward} />Skipped</p>;
				break;
			
			default:
				break;
		}
	}
	
	return (
		<div className="activity-element">
			<ProgressCircle daysSince={daysSince} frequency={frequency} color={color} />
			<div>
				<div className="mb-10">
					<h3 className="activity-title mb-0">
						<Link to={`/days-since/${id}`}>{title}</Link>
					</h3>
					<p>{getFrequencyDisplay(frequency)} • {`Last done ${getDaysSinceDisplay(daysSince)}`}</p>
				</div>
				{eventDisplay}
			</div>
		</div>
	)
}

ActivityElement.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	daysSince: PropTypes.number.isRequired,
	frequency: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	todaysEvent: PropTypes.number,
}

