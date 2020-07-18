import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FlipMove from 'react-flip-move';

import CycleForm from '../CycleForm';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import CycleItem from '../CycleItem';
import { createCycle, updateCycle, deleteCycle, listCycles, selectCycles, selectCyclesLoading, selectCyclesError } from '../../redux/ducks/cycles';
import { MODAL_TYPES } from '../../utils/constants';
import empty from './empty.svg';
import DeleteForm from '../../components/DeleteForm';

export class CycleList extends Component {
	state = {
		modalCycle: null,
		[MODAL_TYPES.CREATE]: false,
		[MODAL_TYPES.EDIT]: false,
		[MODAL_TYPES.DELETE]: false,
	}

	constructor(props) {
		super(props);

		props.listCycles();
	}

	handleVisibilityChange = (modal, isVisible) => {
		this.setState({
			[modal]: isVisible,
		});
	}

	openModal = (modal, modalCycle) => {
		this.setState({
			[modal]: true,
			modalCycle,
		});

		if (modal === MODAL_TYPES.CREATE)
			this.createFormRef.reset();
		else if (modal === MODAL_TYPES.EDIT)
			this.editFormRef.reset(modalCycle);
	}

	handleCreateCycle = cycle => {
		const {
			createCycle,
		} = this.props;

		this.setState({
			[MODAL_TYPES.CREATE]: false,
		});

		createCycle(cycle);
	}

	handleEditCycle = cycle => {
		const {
			updateCycle,
		} = this.props;

		this.setState({
			[MODAL_TYPES.EDIT]: false,
		});

		updateCycle({ ...this.state.modalCycle, ...cycle });
	}

	handleDeleteCycle = isConfirm => {
		const {
			deleteCycle,
		} = this.props;

		this.setState({
			[MODAL_TYPES.DELETE]: false,
		});

		if (isConfirm)
			deleteCycle(this.state.modalCycle.id);
	}

	render() {
		const {
			cycles,
			cyclesLoading,
			cyclesError,
		} = this.props;

		if (cyclesLoading)
			return (
				<div>
					<h2>Cycles</h2>
					<Loader />
				</div>
			);

		if (!cycles || cyclesError)
			return <Redirect to="/" />;

		return (
			<div>
				<h2>Cycles</h2>
				<div className="mb-20">
					<Button icon={faPlus} color="blue" onClick={() => this.openModal(MODAL_TYPES.CREATE)}>Create Cycle</Button>
				</div>
				{
					cycles.length !== 0
						? <FlipMove className="item-list">
							{
								cycles.map(cycle => (
									<CycleItem
										key={cycle.id}
										cycle={cycle}
										openEditModal={cycle => this.openModal(MODAL_TYPES.EDIT, cycle)}
										openDeleteModal={cycle => this.openModal(MODAL_TYPES.DELETE, cycle)}
									/>
								))
							}
						</FlipMove>
						: <div className="grid mt-40">
							<div className="center-wide">
								<img className="mb-20" src={empty} alt="Empty street" />
								<h3>No Cycles</h3>
							</div>
						</div>
				}
				<Modal
					title="Create Cycle"
					isVisible={this.state[MODAL_TYPES.CREATE]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.CREATE, visibility)}
				>
					<CycleForm onSubmit={this.handleCreateCycle} ref={createForm => this.createFormRef = createForm} />
				</Modal>
				<Modal
					title="Edit Cycle"
					isVisible={this.state[MODAL_TYPES.EDIT]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.EDIT, visibility)}
				>
					<CycleForm onSubmit={this.handleEditCycle} ref={editForm => this.editFormRef = editForm} />
				</Modal>
				<Modal
					title="Delete Cycle"
					isVisible={this.state[MODAL_TYPES.DELETE]}
					onVisibilityChange={visibility => this.handleVisibilityChange(MODAL_TYPES.DELETE, visibility)}
				>
					<DeleteForm onSubmit={this.handleDeleteCycle} />
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	cycles: selectCycles(state),
	cyclesLoading: selectCyclesLoading(state),
	cyclesError: selectCyclesError(state),
});

const dispatchers = {
	createCycle,
	updateCycle,
	deleteCycle,
	listCycles,
};

export default connect(mapStateToProps, dispatchers)(CycleList);