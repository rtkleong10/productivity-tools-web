import moment from 'moment';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faForward, faQuestion, faEdit } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import { EVENT_TYPES } from '../utils';
import { getTextWithBrs } from '../../utils/text';
import './index.scss';

export default function EventItem(props) {
	const {
		event: {
			id,
			event_type,
			date,
			description,
		},
		event,
		openEditModal,
		openDeleteModal,
	} = props;

	const dateStr = moment(date).format('D MMMM YYYY');;

	var eventDisplay = "";

	switch (event_type) {
		case EVENT_TYPES.COMPLETED:
			eventDisplay = <><FontAwesomeIcon className="mr-10" icon={faCheck} />Completed</>
			break;

		case EVENT_TYPES.SKIPPED:
			eventDisplay = <><FontAwesomeIcon className="mr-10" icon={faForward} />Skipped</>;
			break;

		default:
			eventDisplay = <><FontAwesomeIcon className="mr-10" icon={faQuestion} />Unknown event</>;
			break;
	}

	return (
		<div key={id} className="event-item">
			<div>
				<p>{eventDisplay} on {dateStr}</p>
				<p className="small">{getTextWithBrs(description)}</p>
			</div>
			<div className="btn-group">
				<Button icon={faEdit} color="green" size="sm" onClick={() => openEditModal(event)} />
				<Button icon={faTrash} color="red" size="sm" onClick={() => openDeleteModal(event)} />
			</div>
		</div>
	)
}
