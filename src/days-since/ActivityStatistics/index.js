import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Loader from "../../components/Loader";
import { retrieveActivityStatistics, selectActivityStatistics, selectActivityStatisticsError, selectActivityStatisticsLoading } from '../../redux/ducks/activityStatistics';

export function ActivityStatistics(props) {
	const {
		className,
		activityId,
		activityStatistics,
		activityStatisticsLoading,
		activityStatisticsError,
		retrieveActivityStatistics,
	} = props;

	useEffect(() => {
		retrieveActivityStatistics(activityId)
	}, [retrieveActivityStatistics, activityId]);

	if (activityStatisticsLoading || !activityStatistics || activityStatisticsError)
		return <Loader />;

	const {
		average_frequency,
		total_count,
		completed_count,
		skipped_count,
	} = activityStatistics;

	return (
		<div className={className}>
			<h2>Statistics</h2>
			{
				average_frequency &&
				<p>Average frequency (over last 10 events): Every {average_frequency.toFixed(1)} days</p>
			}
			<p>
				Total: {total_count} times<br />
				Completed: {completed_count} times<br />
				Skipped: {skipped_count} times
			</p>
		</div>
	)
};

const mapStateToProps = state => ({
	activityStatistics: selectActivityStatistics(state),
	activityStatisticsLoading: selectActivityStatisticsLoading(state),
	activityStatisticsError: selectActivityStatisticsError(state),
});

const dispatchers = {
	retrieveActivityStatistics,
};

export default connect(mapStateToProps, dispatchers)(ActivityStatistics);
