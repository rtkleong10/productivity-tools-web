import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

import Modal from '../../components/Modal';
import Breadcrumbs from '../../components/Breadcrumbs';
import ActivityForm from '../ActivityForm';
import ActivityList from '../ActivityList';
import { createActivity } from '../../redux/ducks/activities';
import { MODAL_TYPES } from '../../utils/constants';

export class ActivityListPage extends Component {
	state = {
		[MODAL_TYPES.CREATE]: false,
	};
	
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

	render() {
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
				<ActivityList openCreateModal={this.openCreateModal} />
				<Modal title="Create Activity" isVisible={this.state[MODAL_TYPES.CREATE]} onVisibilityChange={this.handleVisibilityChange}>
					<ActivityForm onSubmit={this.handleCreateActivity} ref={activityForm => this.activityFormRef = activityForm} />
				</Modal>
			</div>
		);
	}
}

const dispatchers = {
	createActivity,
};

export default connect(() => ({}), dispatchers)(ActivityListPage);
