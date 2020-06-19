import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faCheck, faForward, faQuestion, faEdit } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { EVENT_TYPES } from '../utils';
import { MODAL_TYPES } from '../../utils/constants';
import { getTextWithBrs } from '../../utils/text';
import { createActivityEvent, updateActivityEvent, deleteActivityEvent, listActivityEvents, selectActivityEvents, selectActivityEventsLoading, selectActivityEventsError } from '../../redux/ducks/activityEvents';
import './index.scss';
import EventForm from '../EventForm';
import DeleteForm from '../../components/DeleteForm';
import Modal from '../../components/Modal';
import empty from './empty.svg';

export class EventList extends Component {
	state = {
		modalEvent: null,
		[MODAL_TYPES.CREATE]: false,
		[MODAL_TYPES.EDIT]: false,
		[MODAL_TYPES.DELETE]: false,
	}

	constructor(props) {
		super(props);

		const activityId = props.activityId;
		props.listActivityEvents(activityId);
	}

	handleVisibilityChange = (modal, isVisible) => {
		this.setState({
			[modal]: isVisible,
		});
	}

	openModal = (modal, modalEvent) => {
		this.setState({
			[modal]: true,
			modalEvent,
		});

		if (modal === MODAL_TYPES.CREATE)
			this.createFormRef.reset();
		else if (modal === MODAL_TYPES.EDIT)
			this.editFormRef.reset(modalEvent);
	}

	handleCreateEvent = event => {
		const {
			activityId,
			createActivityEvent,
		} = this.props;

		this.setState({
			[MODAL_TYPES.CREATE]: false,
		});

		createActivityEvent(activityId, event);
	}

	handleEditEvent = event => {
		const {
			activityId,
			updateActivityEvent,
		} = this.props;

		this.setState({
			[MODAL_TYPES.EDIT]: false,
		});

		updateActivityEvent(activityId, { ...this.state.modalEvent, ...event });
	}

	handleDeleteEvent = isConfirm => {
		const {
			activityId,
			deleteActivityEvent,
		} = this.props;

		this.setState({
			[MODAL_TYPES.DELETE]: false,
		});

		if (isConfirm)
			deleteActivityEvent(activityId, this.state.modalEvent.id);
	}

	render() {
		const {
			activityEvents,
			activityEventsLoading,
			activityEventsError,
		} = this.props;

		if (activityEventsLoading)
			return (
				<div>
					<h2>Events</h2>
					<Loader />
				</div>
			);

		if (!activityEvents || activityEventsError)
			return <Redirect to="/days-since" />;

		activityEvents.sort((a, b) => moment(a.date, "YYYY-MM-DD").toDate() - moment(b.date, "YYYY-MM-DD").toDate()).reverse();

		return (
			<div>
				<h2>Events</h2>
				<div className="mb-20">
					<Button icon={faPlus} color="blue" onClick={() => this.openModal(MODAL_TYPES.CREATE)}>Create Event</Button>
				</div>
				{
					activityEvents.length !== 0
						? <div className="box">
							{
								activityEvents.map(event => {
									const {
										id,
										event_type,
										date,
										description,
									} = event;

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

									const dateStr = moment(date).format('D MMMM YYYY');;

									return (
										<div key={id} className="event-item">
											<div>
												<p>{eventDisplay} on {dateStr}</p>
												<p className="small">{getTextWithBrs(description)}</p>
											</div>
											<div className="btn-group">
												<Button icon={faEdit} color="green" size="sm" onClick={() => this.openModal(MODAL_TYPES.EDIT, event)} />
												<Button icon={faTrash} color="red" size="sm" onClick={() => this.openModal(MODAL_TYPES.DELETE, event)} />
											</div>
										</div>
									);
								})
							}
						</div>
						: <div className="center mt-40">
							<img className="mb-20" src={empty} alt="Trees under the sun" />
							<h3>No Events</h3>
						</div>
				}
				<Modal
					title="Create Event"
					isVisible={this.state[MODAL_TYPES.CREATE]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.CREATE, visibility)}
				>
					<EventForm onSubmit={this.handleCreateEvent} ref={createForm => this.createFormRef = createForm} />
				</Modal>
				<Modal
					title="Edit Event"
					isVisible={this.state[MODAL_TYPES.EDIT]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.EDIT, visibility)}
				>
					<EventForm onSubmit={this.handleEditEvent} ref={editForm => this.editFormRef = editForm} />
				</Modal>
				<Modal
					title="Delete Event"
					isVisible={this.state[MODAL_TYPES.DELETE]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.DELETE, visibility)}
				>
					<DeleteForm onSubmit={this.handleDeleteEvent} />
				</Modal>
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
	createActivityEvent,
	updateActivityEvent,
	deleteActivityEvent,
	listActivityEvents,
};

export default connect(mapStateToProps, dispatchers)(EventList);
