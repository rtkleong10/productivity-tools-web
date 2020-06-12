import React, { Component } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ActivityElement from '../ActivityElement';
import ActivityForm from '../ActivityForm';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import './index.scss';
import Breadcrumbs from '../../components/Breadcrumbs';

const activities = [
	{
		id: "1",
		title: "Water the Plants",
		frequency: 7,
		daysSince: 8,
		color: "#25BA9C",
		todaysEvent: null,
	},
	{
		id: "2",
		title: "Water the Plants",
		frequency: 7,
		daysSince: 2,
		color: "#4597E3",
		todaysEvent: null,
	},
	{
		id: "3",
		title: "Take Out the Trash",
		frequency: 7,
		daysSince: 1,
		color: "#D94150",
		todaysEvent: 1,
	},
	{
		id: "4",
		title: "Do the Laundry",
		frequency: 7,
		daysSince: 2,
		color: "#F5D624",
		todaysEvent: 2,
	},
	{
		id: "5",
		title: "Do the Laundry",
		frequency: 7,
		daysSince: 4,
		color: "#9D5BFF",
		todaysEvent: 1,
	},
];

export class ActivityListPage extends Component {
	state = {
		createModalIsVisible: false,
	};

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

		console.log(activity);
	}

	render() {
		const {
			createModalIsVisible,
		} = this.state;

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
									daysSince,
									color,
									todaysEvent
								} = activity;

								return (
									<ActivityElement
										key={id}
										id={id}
										title={title}
										frequency={frequency}
										daysSince={daysSince}
										color={color}
										todaysEvent={todaysEvent}
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

export default ActivityListPage;
