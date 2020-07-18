import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import TimerForm from '../TimerForm';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import TimerItem from '../TimerItem';
import { createTimer, updateTimer, deleteTimer, moveUpTimer, moveDownTimer } from '../../redux/ducks/timers';
import { MODAL_TYPES } from '../../utils/constants';
import empty from './empty.svg';
import DeleteForm from '../../components/DeleteForm';

export class TimerList extends Component {
	state = {
		modalTimer: null,
		[MODAL_TYPES.CREATE]: false,
		[MODAL_TYPES.EDIT]: false,
		[MODAL_TYPES.DELETE]: false,
	}

	handleVisibilityChange = (modal, isVisible) => {
		this.setState({
			[modal]: isVisible,
		});
	}

	openModal = (modal, modalTimer) => {
		this.setState({
			[modal]: true,
			modalTimer,
		});

		if (modal === MODAL_TYPES.CREATE)
			this.createFormRef.reset();
		else if (modal === MODAL_TYPES.EDIT)
			this.editFormRef.reset(modalTimer);
	}

	handleCreateTimer = timer => {
		const {
			cycleId,
			createTimer,
		} = this.props;

		this.setState({
			[MODAL_TYPES.CREATE]: false,
		});

		createTimer(cycleId, timer);
	}

	handleEditTimer = timer => {
		const {
			cycleId,
			updateTimer,
		} = this.props;

		this.setState({
			[MODAL_TYPES.EDIT]: false,
		});

		updateTimer(cycleId, { ...this.state.modalTimer, ...timer });
	}

	handleDeleteTimer = isConfirm => {
		const {
			cycleId,
			deleteTimer,
		} = this.props;

		this.setState({
			[MODAL_TYPES.DELETE]: false,
		});

		if (isConfirm)
			deleteTimer(cycleId, this.state.modalTimer.id);
	}

	render() {
		const {
			currentTimer,
			cycleId,
			timers,
			colors,
			moveUpTimer,
			moveDownTimer,
			isEditable,
			setEditable,
		} = this.props;

		const currentTimerId = currentTimer ? currentTimer.id : null;

		let timerElements = timers.map((timer, i) => (
			<TimerItem
				key={timer.id}
				timer={timer}
				openEditModal={() => this.openModal(MODAL_TYPES.EDIT, timer)}
				openDeleteModal={() => this.openModal(MODAL_TYPES.DELETE, timer)}
				isEditable={isEditable && timer.id !== currentTimerId}
				moveUpTimer={i !== 0 ? () => moveUpTimer(cycleId, timer.id) : null}
				moveDownTimer={i !== timers.length - 1 ? () => moveDownTimer(cycleId, timer.id) : null}
				colors={colors}
				isCurrentTimer={timer.id === currentTimerId}
			/>
		));

		timerElements.push(<hr key="divider" className="my-30" />);
		const currentTimerIndex = timers.findIndex(timer => timer.id === currentTimerId);

		if (currentTimerIndex !== -1)
			timerElements = timerElements.slice(currentTimerIndex).concat(timerElements.slice(0, currentTimerIndex));

		return (
			<div>
				<h2>Timers</h2>
				<div className="btn-group mb-20">
					{
						isEditable
							? <>
								<Button icon={faPlus} color="blue" onClick={() => this.openModal(MODAL_TYPES.CREATE)}>Create Timer</Button>
								<Button key="edit-btn" className="ml-auto mr-0" color="faded-grey" onClick={() => setEditable(false)}>Done</Button>
							</>
							: <Button key="edit-btn" className="ml-auto mr-0" color="green" onClick={() => setEditable(true)}>Edit</Button>
					}
				</div>
				{
					timers.length !== 0
						? <div>
							{timerElements}
						</div>
						: <div className="grid mt-40">
							<div className="center-wide">
								<img className="mb-20" src={empty} alt="Empty street" />
								<h3>No Timers</h3>
							</div>
						</div>
				}
				<Modal
					title="Create Timer"
					isVisible={this.state[MODAL_TYPES.CREATE]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.CREATE, visibility)}
				>
					<TimerForm onSubmit={this.handleCreateTimer} ref={createForm => this.createFormRef = createForm} />
				</Modal>
				<Modal
					title="Edit Timer"
					isVisible={this.state[MODAL_TYPES.EDIT]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.EDIT, visibility)}
				>
					<TimerForm onSubmit={this.handleEditTimer} ref={editForm => this.editFormRef = editForm} />
				</Modal>
				<Modal
					title="Delete Timer"
					isVisible={this.state[MODAL_TYPES.DELETE]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.DELETE, visibility)}
				>
					<DeleteForm onSubmit={this.handleDeleteTimer} />
				</Modal>
			</div>
		);
	}
}

const dispatchers = {
	createTimer,
	updateTimer,
	deleteTimer,
	moveUpTimer,
	moveDownTimer,
};

export default connect(() => ({}), dispatchers)(TimerList);