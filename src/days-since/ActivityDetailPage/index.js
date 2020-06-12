import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet";

import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';
import Loader from '../../components/Loader';
import { getFrequencyDisplay } from '../utils';
import { retrieveActivity, selectActivity, selectActivityLoading, selectActivityError } from '../../redux/ducks/activities';
import './index.scss';
import EventList from '../EventList';

export class ActivityDetailPage extends Component {
	constructor(props) {
		super(props);

		const activityId = props.match.params.activityId;
		props.retrieveActivity(activityId);
		console.log("RETRIEVE")
	}

	render() {
		const {
			activity,
			activityLoading,
			activityError,
			match: {
				params
			}
		} = this.props;

		console.log(this.props);

		const activityId = params.activityId;

		if ((!activity && activityLoading) || activity.id !== activityId)
			return <Loader />;
		
		if (activityError)
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
						<h1>{title}</h1>
						<div className="mb-20">
							<p>{description}</p>
							<p>Frequency: {getFrequencyDisplay(frequency)}</p>
						</div>
						<div>
							<Button icon={faEdit} color="green" className="mr-5">Edit</Button>
							<Button icon={faTrash} color="red">Delete</Button>
						</div>
					</div>
					<EventList
						activityId={activityId}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	activity: selectActivity(state),
	activityLoading: selectActivityLoading(state),
	activityError: selectActivityError(state),
});

const dispatchers = {
	retrieveActivity,
};

export default connect(mapStateToProps, dispatchers)(ActivityDetailPage);
