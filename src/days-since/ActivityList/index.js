import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FlipMove from 'react-flip-move';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ActivityForm from '../ActivityForm';
import ActivityItem from '../ActivityItem';
import { listActivities, createActivity, selectActivities, selectActivitiesLoading, selectActivitiesError } from '../../redux/ducks/activities';
import { listColors, selectColors, selectColorsLoading, selectColorsError } from '../../redux/ducks/colors';
import { MODAL_TYPES } from '../../utils/constants';
import empty from './empty.svg';

export class ActivityList extends Component {
	state = {
		[MODAL_TYPES.CREATE]: false,
	};

	constructor(props) {
		super(props);

		props.listActivities();
		props.listColors();
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

	mapActivitiesToActivityItems = activities => {
		return activities.map(activity => {
			const {
				id,
				title,
				frequency,
				days_since,
				color: colorId,
				last_event_type,
				todays_event,
			} = activity;

			return (
				<ActivityItem
					activity={activity}
					key={id}
					id={id}
					title={title}
					frequency={frequency}
					days_since={days_since}
					color={this.props.colors.find(color => color.id === colorId).hex_code}
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
			colors,
			colorsLoading,
			colorsError,
		} = this.props;

		if (activitiesLoading || colorsLoading)
			return (
				<div>
					<h2>Activities</h2>
					<Loader />
				</div>
			);

		if (!activities || activitiesError || !colors || colorsError)
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
		activitiesSplitByFrequency.false.sort((a, b) => a.days_since - b.days_since);

		return (
			<div>
				<h2>Activities</h2>
				<div className="mb-20">
					<Button icon={faPlus} color="blue" onClick={this.openCreateModal}>Create Activity</Button>
				</div>
				{
					activitiesSplitByFrequency.true.length !== 0 &&
					<div>
						<h3>With Frequency</h3>
						<FlipMove className="item-list">
							{this.mapActivitiesToActivityItems(activitiesSplitByFrequency.true)}
						</FlipMove>
					</div>
				}
				{
					activitiesSplitByFrequency.false.length !== 0 &&
					<div>
						<h3>Without Frequency</h3>
						<FlipMove className="item-list">
							{this.mapActivitiesToActivityItems(activitiesSplitByFrequency.false)}
						</FlipMove>
					</div>
				}
				{
					activities.length === 0 &&
					<div className="grid mt-40">
						<div className="center-wide">
							<img className="mb-20" src={empty} alt="Empty street" />
							<h3>No Activities</h3>
						</div>
					</div>
				}
				<Modal title="Create Activity" isVisible={this.state[MODAL_TYPES.CREATE]} onVisibilityChange={this.handleVisibilityChange}>
					<ActivityForm onSubmit={this.handleCreateActivity} ref={activityForm => this.activityFormRef = activityForm} />
				</Modal>
			</div>
		);
	}
}

ActivityList.propTypes = {
	activities: PropTypes.array.isRequired,
	activitiesLoading: PropTypes.bool.isRequired,
	activitiesError: PropTypes.object,

	colors: PropTypes.array.isRequired,
	colorsLoading: PropTypes.bool.isRequired,
	colorsError: PropTypes.object,

	createActivity: PropTypes.func.isRequired,
	listActivities: PropTypes.func.isRequired,
	listColors: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	activities: selectActivities(state),
	activitiesLoading: selectActivitiesLoading(state),
	activitiesError: selectActivitiesError(state),

	colors: selectColors(state),
	colorsLoading: selectColorsLoading(state),
	colorsError: selectColorsError(state),
});

const dispatchers = {
	createActivity,
	listActivities,
	listColors,
};

export default connect(mapStateToProps, dispatchers)(ActivityList);
