import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faCheck, faForward, faQuestion, faEdit } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { EVENT_TYPES } from '../utils';
import { listActivityEvents, selectActivityEvents, selectActivityEventsLoading, selectActivityEventsError } from '../../redux/ducks/activityEvents'; import React, { Component } from 'react';
import './index.scss';

export class EventList extends Component {
	componentDidMount() {
		const activityId = this.props.activityId;
		this.props.listActivityEvents(activityId);
	}

	render() {
		const {
			activityEvents,
			activityEventsLoading,
			activityEventsError,
		} = this.props;

		if (!activityEvents && activityEventsLoading)
			return <Loader />;

		if (activityEventsError)
			return <Redirect to="/days-since" />;

		return (
			<div>
				<h2>Events</h2>
				<div className="mb-20">
					<Button icon={faPlus} color="blue">Create Event</Button>
				</div>
				<div className="box">
					{
						activityEvents.length !== 0
							? activityEvents.map(event => {
								const {
									id,
									event_type: eventType,
									date
								} = event;

								var eventDisplay = "";

								switch (eventType) {
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

								const dateStr = moment(date).format('D MMMM YYYY');;

								return (
									<div key={id} className="event-item">
										<p>{eventDisplay} on {dateStr}</p>
										<div>
											<Button icon={faEdit} color="green" className="mr-5" />
											<Button icon={faTrash} color="red" />
										</div>
									</div>
								);
							})
							: <p>No events found</p>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	activityEvents: selectActivityEvents(state),
	activityEventsLoading: selectActivityEventsLoading(state),
	activityEventsError: selectActivityEventsError(state),
});

const dispatchers = {
	listActivityEvents,
};

export default connect(mapStateToProps, dispatchers)(EventList);
