import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ActivityItem from '../ActivityItem';
import { listActivities, selectActivities, selectActivitiesLoading, selectActivitiesError } from '../../redux/ducks/activities';
import { listColors, selectColors, selectColorsLoading, selectColorsError } from '../../redux/ducks/colors'; 
import './index.scss';
import empty from './empty.svg';

export class ActivityListPage extends Component {
	constructor(props) {
		super(props);
		
		props.listActivities();
		props.listColors();
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
			openCreateModal,
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
					<Button icon={faPlus} color="blue" onClick={openCreateModal}>Create Activity</Button>
				</div>
				{
					activitiesSplitByFrequency.true.length !== 0 &&
					<div>
						<h3>With Frequency</h3>
						<div className="grid activity-list">
							{this.mapActivitiesToActivityItems(activitiesSplitByFrequency.true)}
						</div>
					</div>
				}
				{
					activitiesSplitByFrequency.false.length !== 0 &&
					<div>
						<h3>Without Frequency</h3>
						<div className="grid activity-list">
							{this.mapActivitiesToActivityItems(activitiesSplitByFrequency.false)}
						</div>
					</div>
				}
				{
					activities.length === 0 &&
					<div className="grid mt-40">
						<div className="activity-list-empty center">
							<img className="mb-20" src={empty} alt="Empty street" />
							<h3>No Activities</h3>
						</div>
					</div>
				}
			</div>
		);
	}
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
	listActivities,
	listColors,
};

export default connect(mapStateToProps, dispatchers)(ActivityListPage);
