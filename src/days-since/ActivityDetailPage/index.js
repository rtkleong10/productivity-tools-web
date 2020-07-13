import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet";

import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import ActivityForm from '../ActivityForm';
import { getFrequencyDisplay } from '../utils';
import { retrieveActivity, updateActivity, deleteActivity, selectActivity, selectActivityLoading, selectActivityError, selectActivityId } from '../../redux/ducks/activities';
import EventList from '../EventList';
import DeleteForm from '../../components/DeleteForm';
import { MODAL_TYPES } from '../../utils/constants';
import { getTextWithBrs } from '../../utils/text';
import './index.scss';
import ActivityStatistics from '../ActivityStatistics';

export class ActivityDetailPage extends Component {
	state = {
		[MODAL_TYPES.EDIT]: false,
		[MODAL_TYPES.DELETE]: false,
	};

	constructor(props) {
		super(props);

		const activityId = props.match.params.activityId;
		props.retrieveActivity(activityId);
	}

	handleVisibilityChange = (modal, isVisible) => {
		this.setState({
			[modal]: isVisible,
		});
	}

	openModal = modal => {
		this.setState({
			[modal]: true,
		});

		if (modal === MODAL_TYPES.EDIT)
			this.activityFormRef.reset(this.props.activity);
	}

	handleEditActivity = activity => {
		this.setState({
			[MODAL_TYPES.EDIT]: false,
		});

		this.props.updateActivity({ ...this.props.activity, ...activity });
	}

	handleDeleteActivity = isConfirm => {
		const {
			activity,
			deleteActivity,
		} = this.props;

		this.setState({
			[MODAL_TYPES.DELETE]: false,
		});

		if (isConfirm)
			deleteActivity(activity.id);
	}

	render() {
		const {
			activity,
			activityId,
			activityLoading,
			activityError,
			match: {
				params
			}
		} = this.props;

		if (activityLoading || activityId !== params.activityId)
			return <Loader />;

		if (!activity || activityError)
			return <Redirect to="/days-since" />;

		const {
			title,
			description,
			frequency,
		} = activity;

		return (
			<div className="container">
				<Helmet>
					<title>{`Days Since | ${title}`}</title>
				</Helmet>
				<Breadcrumbs
					breadcrumbs={[
						{ title: "Home", to: "/" },
						{ title: "Days Since", to: "/days-since" },
						{ title },
					]} />
				<div className="grid activity-detail">
					<div>
						<div className="mb-30">
							<div className="mb-20">
								<h1>{title}</h1>
								{description && <p>{getTextWithBrs(description)}</p>}
								{frequency && <p>Frequency: {getFrequencyDisplay(frequency)}</p>}
							</div>
							<div className="btn-group">
								<Button icon={faEdit} color="green" onClick={() => this.openModal(MODAL_TYPES.EDIT)}>Edit</Button>
								<Button icon={faTrash} color="red" onClick={() => this.openModal(MODAL_TYPES.DELETE)}>Delete</Button>
							</div>
						</div>
						<ActivityStatistics activityId={activityId} />
					</div>
					<EventList
						activityId={activityId}
					/>
				</div>
				<Modal
					title="Edit Activity"
					isVisible={this.state[MODAL_TYPES.EDIT]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.EDIT, visibility)}
				>
					<ActivityForm onSubmit={this.handleEditActivity} ref={activityForm => this.activityFormRef = activityForm} />
				</Modal>
				<Modal
					title="Delete Activity"
					isVisible={this.state[MODAL_TYPES.DELETE]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.DELETE, visibility)}
				>
					<DeleteForm onSubmit={this.handleDeleteActivity} />
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	activity: selectActivity(state),
	activityId: selectActivityId(state),
	activityLoading: selectActivityLoading(state),
	activityError: selectActivityError(state),
});

const dispatchers = {
	retrieveActivity,
	updateActivity,
	deleteActivity,
};

export default connect(mapStateToProps, dispatchers)(ActivityDetailPage);
