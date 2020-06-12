import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Breadcrumbs from '../../components/Breadcrumbs';
import Loader from '../../components/Loader';
import ActivityElement from '../ActivityElement';
import ActivityForm from '../ActivityForm';
import { listActivities, selectActivities, selectActivitiesLoading, selectActivitiesError } from '../../redux/ducks/activities';
import './index.scss';

export class ActivityListPage extends Component {
	state = {
		createModalIsVisible: false,
	};

	componentDidMount() {
		this.props.listActivities();
	}

	handleVisibilityChange = isVisible => {
		this.setState({
			createModalIsVisible: isVisible,
		});
	}

	openCreateModal = () => {
		this.setState({
			createModalIsVisible: true,
		});
	}

	handleCreateActivity = activity => {
		this.setState({
			createModalIsVisible: false,
		});
	}

	render() {
		const {
			activities,
			activitiesLoading,
			activitiesError,
		} = this.props;

		const {
			createModalIsVisible,
		} = this.state;

		if (!activities && activitiesLoading)
			return <Loader />;

		if (activitiesError)
			return <Redirect to="/" />;

		return (
			<div className="container">
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
					<div className="grid activity-list">
						{
							activities.map(activity => {
								const {
									id,
									title,
									frequency,
									days_since,
									color,
									todays_event
								} = activity;

								return (
									<ActivityElement
										key={id}
										id={id}
										title={title}
										frequency={frequency}
										daysSince={days_since}
										color={color}
										todaysEvent={todays_event}
									/>
								)
							})
						}
					</div>
				</div>
				<Modal title="Create Activity" isVisible={createModalIsVisible} onVisibilityChange={this.handleVisibilityChange}>
					<ActivityForm onSubmit={this.handleCreateActivity} />
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
	listActivities,
};

export default connect(mapStateToProps, dispatchers)(ActivityListPage);
