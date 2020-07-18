import moment from 'moment';
import React, { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faForward, faQuestion, faEdit } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import { EVENT_TYPES } from '../utils';
import { getTextWithBrs } from '../../utils/text';
import './index.scss';

export const EventItem = forwardRef((props, ref) => {
	const {
		event: {
			event_type,
			date,
			description,
		},
		event,
		isEditable,
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
		<div className="event-item" ref={ref}>
			<div className="mb-n10">
				<p>{eventDisplay} on {dateStr}</p>
				<p className="small">{getTextWithBrs(description)}</p>
			</div>
			{
				isEditable &&
				<div className="btn-group mt-20">
					<Button icon={faEdit} color="green" size="sm" onClick={() => openEditModal(event)} aria-label="Edit" />
					<Button icon={faTrash} color="red" size="sm" onClick={() => openDeleteModal(event)} aria-label="Delete" />
				</div>
			}
		</div>
	)
})

export default EventItem;
