import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet";

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Breadcrumbs from '../../components/Breadcrumbs';
import Loader from '../../components/Loader';
import ActivityElement from '../ActivityElement';
import ActivityForm from '../ActivityForm';
import { createActivity, listActivities, selectActivities, selectActivitiesLoading, selectActivitiesError } from '../../redux/ducks/activities';
import { MODAL_TYPES } from '../../utils/constants';
import './index.scss';

export class ActivityListPage extends Component {
	state = {
		[MODAL_TYPES.CREATE]: false,
	};

	constructor(props) {
		super(props);

		props.listActivities();
	}

	handleVisibilityChange = isVisible => {
		this.setState({
			[MODAL_TYPES.CREATE]: isVisible,
		});
	}

	openCreateModal = () => {
		this.setState({
			[MODAL_TYPES.CREATE]: true,
		});

		this.activityFormRef.reset();
	}

	handleCreateActivity = activity => {
		this.setState({
			[MODAL_TYPES.CREATE]: false,
		});

		this.props.createActivity(activity);
	}

	mapActivitiesToActivityElements = activities => {
		return activities.map(activity => {
			const {
				id,
				title,
				frequency,
				days_since,
				color,
				last_event_type,
				todays_event,
			} = activity;

			return (
				<ActivityElement
					key={id}
					id={id}
					title={title}
					frequency={frequency}
					days_since={days_since}
					color={color}
					last_event_type={last_event_type}
					todays_event={todays_event}
				/>
			)
		})
	}

	render() {
		const {
			activities,
			activitiesLoading,
			activitiesError,
		} = this.props;

		if (activitiesLoading)
			return <Loader />;

		if (!activities || activitiesError)
			return <Redirect to="/" />;

		var activitiesSplitByFrequency = activities.reduce(
			(acc, activity) => {
				acc[activity.frequency !== null && activity.frequency !== undefined].push(activity);
				return acc;
			},
			{
				true: [],
				false: []
			}
		)

		activitiesSplitByFrequency.true.sort((a, b) => (a.frequency - a.days_since) - (b.frequency - b.days_since));

		return (
			<div className="container">
				<Helmet>
					<title>Days Since</title>
				</Helmet>
				<Breadcrumbs
					breadcrumbs={[
						{ title: "Home", to: "/" },
						{ title: "Days Since" },
					]} />
				<h1>Days Since</h1>
				<div>
					<h2>Activities</h2>
					<div className="mb-20">
						<Button icon={faPlus} color="blue" onClick={this.openCreateModal}>Create Activity</Button>
					</div>
					{
						activitiesSplitByFrequency.true.length !== 0 &&
						<div>
							<h3>With Frequency</h3>
							<div className="grid activity-list">
								{this.mapActivitiesToActivityElements(activitiesSplitByFrequency.true)}
							</div>
						</div>
					}
					{
						activitiesSplitByFrequency.false.length !== 0 &&
						<div>
							<h3>Without Frequency</h3>
							<div className="grid activity-list">
								{this.mapActivitiesToActivityElements(activitiesSplitByFrequency.false)}
							</div>
						</div>
					}
					{
						activities.length === 0 && <p>No activities found.</p>
					}
				</div>
				<Modal title="Create Activity" isVisible={this.state[MODAL_TYPES.CREATE]} onVisibilityChange={this.handleVisibilityChange}>
					<ActivityForm onSubmit={this.handleCreateActivity} ref={activityForm => this.activityFormRef = activityForm} />
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	activities: selectActivities(state),
	activitiesLoading: selectActivitiesLoading(state),
	activitiesError: selectActivitiesError(state),
});

const dispatchers = {
	createActivity,
	listActivities,
};

export default connect(mapStateToProps, dispatchers)(ActivityListPage);
