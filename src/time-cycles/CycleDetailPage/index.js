import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Breadcrumbs from '../../components/Breadcrumbs';
import Loader from '../../components/Loader';
import { retrieveCycle, selectCycle, selectCycleId, selectCycleLoading, selectCycleError } from '../../redux/ducks/cycles';
import { listTimers, selectTimers, selectTimersLoading, selectTimersError } from '../../redux/ducks/timers';
import { listColors, selectColors, selectColorsLoading, selectColorsError } from '../../redux/ducks/colors';
import TimerList from '../TimerList';
import TimerDisplay from '../TimerDisplay';

export class CycleDetailPage extends Component {
	state = {
		isEditable: false,
		currentTimer: null,
	};

	constructor(props) {
		super(props);

		const cycleId = props.match.params.cycleId;
		props.retrieveCycle(cycleId);
		props.listTimers(cycleId);
		props.listColors();
	}

	getTimer = (next = true) => {
		const {
			timers,
			timersLoading,
			timersError,
			colors,
			colorsLoading,
			colorsError,
		} = this.props;

		const {
			currentTimer,
		} = this.state;

		let timer = null;

		if (timers && !timersLoading && !timersError && colors && !colorsLoading && !colorsError && timers.length !== 0) {
			if (currentTimer === null) {
				timer = next ? timers[0] : timers[timers.length - 1];

			} else {
				const currentTimerIndex = timers.findIndex(timer => timer.id === currentTimer.id);
				timer = next ? timers[(currentTimerIndex + 1) % timers.length] : timers[(currentTimerIndex + timers.length - 1) % timers.length];
			}
		}

		this.setState({
			currentTimer: timer,
		});
		return timer;
	}

	render() {
		const {
			cycle,
			cycleId,
			cycleLoading,
			cycleError,
			timers,
			timersLoading,
			timersError,
			colors,
			colorsLoading,
			colorsError,
			match: {
				params
			}
		} = this.props;

		const {
			isEditable,
			currentTimer,
		} = this.state;

		if (cycleLoading || cycleId !== params.cycleId || timersLoading || colorsLoading)
			return <Loader />;

		if (!cycle || cycleError || !timers || timersError || !colors || colorsError)
			return <Redirect to="/time-cycles" />;

		const {
			title,
		} = cycle;

		return (
			<div className="container">
				<Helmet>
					<title>{`Time Cycles | ${title}`}</title>
				</Helmet>
				<Breadcrumbs
					breadcrumbs={[
						{ title: "Home", to: "/" },
						{ title: "Time Cycles", to: "/time-cycles" },
						{ title },
					]} />
				<div className="side-by-side">
					<div>
						<h1>{title}</h1>
						<TimerDisplay
							currentTimer={currentTimer}
							colors={colors}
							clearCurrentTimer={() => this.setState({ currentTimer: null })}
							getPreviousTimer={() => this.getTimer(false)}
							getNextTimer={() => this.getTimer(true)}
							isDisabled={timers.length === 0}
						/>
					</div>
					<TimerList
						timers={timers}
						colors={colors}
						cycleId={cycleId}
						isEditable={isEditable}
						setEditable={isEditable => this.setState({ isEditable })}
						currentTimer={currentTimer}
					/>
				</div>
			</div>
		);
	}
}

CycleDetailPage.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			cycleId: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	
	timers: PropTypes.array.isRequired,
	timersLoading: PropTypes.bool.isRequired,
	timersError: PropTypes.object,

	colors: PropTypes.array.isRequired,
	colorsLoading: PropTypes.bool.isRequired,
	colorsError: PropTypes.object,

	retrieveCycle: PropTypes.func.isRequired,
	listTimers: PropTypes.func.isRequired,
	listColors: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	cycle: selectCycle(state),
	cycleId: selectCycleId(state),
	cycleLoading: selectCycleLoading(state),
	cycleError: selectCycleError(state),

	timers: selectTimers(state),
	timersLoading: selectTimersLoading(state),
	timersError: selectTimersError(state),

	colors: selectColors(state),
	colorsLoading: selectColorsLoading(state),
	colorsError: selectColorsError(state),
});

const dispatchers = {
	retrieveCycle,
	listTimers,
	listColors,
};

export default connect(mapStateToProps, dispatchers)(CycleDetailPage);
