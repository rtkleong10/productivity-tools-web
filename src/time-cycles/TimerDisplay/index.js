import React, { Component } from 'react';
import { faPause, faPlay, faStop, faLink, faUnlink, faVolumeUp, faVolumeMute, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import './index.scss';
import ding from './ding.mp3';
import { durationSecToMMss, durationStrToSec } from '../../utils/time';

export class TimerDisplay extends Component {
	state = {
		nonce: 0,
		timerEvents: [],
		autoPlay: true,
		sound: true,
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getSecondsLeft = () => {
		const {
			timerEvents,
		} = this.state;

		let timeElapsed = 0;

		for (let i = 0; i < timerEvents.length; i += 2) {
			let startTime, endTime;

			if (i + 1 < timerEvents.length) {
				startTime = timerEvents[i];
				endTime = timerEvents[i + 1];

			} else {
				startTime = timerEvents[i];
				endTime = new Date();
			}

			timeElapsed += endTime - startTime;
		}

		return Math.max(this.getCurrentDuration() - (timeElapsed / 1000), 0);
	}

	getTimeDisplay = () => {
		const secondsLeft = Math.max(Math.round(this.getSecondsLeft()), 0);
		return durationSecToMMss(secondsLeft);
	}

	isPaused = () => {
		return this.state.timerEvents.length % 2 === 0;
	}

	getCurrentDuration = () => {
		const {
			currentTimer,
		} = this.props;

		return currentTimer ? durationStrToSec(currentTimer.duration) : 0;
	}

	tick = () => {
		const secondsLeft = this.getSecondsLeft();

		if (secondsLeft > 0) {
			this.setState({
				nonce: this.state.nonce + 1,
			});

		} else {
			this.pause();

			if (this.state.sound)
				new Audio(ding).play();

			if (this.state.autoPlay) {
				this.changeTimer();
			}
		}

		this.updateCanvas();
	}

	changeTimer = (next = true, play = true) => {
		const newTimer = next ? this.props.getNextTimer() : this.props.getPreviousTimer();

		if (!newTimer)
			return;

		const duration = durationStrToSec(newTimer.duration);

		if (play) {
			clearInterval(this.interval);
			this.interval = setInterval(this.tick, Math.min(duration, 500));
			this.setState({
				nonce: 0,
				timerEvents: [new Date()],
			});

		} else {
			clearInterval(this.interval);
			this.setState({
				nonce: 0,
				timerEvents: [],
			});
			this.updateCanvas(newTimer);
		}
	}

	play = () => {
		if (!this.isPaused())
			return;

		if (this.getSecondsLeft() <= 0) {
			this.changeTimer();

		} else {
			const duration = this.getCurrentDuration();
			clearInterval(this.interval);
			this.interval = setInterval(this.tick, Math.min(duration, 500));
			this.setState({
				timerEvents: [...this.state.timerEvents, new Date()],
			});
		}
	}

	pause = () => {
		if (this.isPaused())
			return;

		clearInterval(this.interval);
		this.setState({
			timerEvents: [...this.state.timerEvents, new Date()],
		});
	}

	stop = () => {
		this.setState({
			nonce: 0,
			timerEvents: [],
		});
		clearInterval(this.interval);
		this.props.clearCurrentTimer();
	}

	updateCanvas = (newTimer = null) => {
		const {
			currentTimer,
			colors,
		} = this.props;
		const timer = newTimer ? newTimer : currentTimer;

		if (!timer)
			return;

		let canvas = this.canvasRef;

		if (canvas) {
			let ctx = canvas.getContext('2d');

			let width = canvas.width;
			let height = canvas.height;

			var cx = width / 2;
			var cy = height / 2;

			const percentage = newTimer ? 1 : this.getSecondsLeft() / this.getCurrentDuration();
			const color = colors.find(color => color.id === timer.color);

			ctx.globalCompositeOperation = 'destination-over';
			ctx.clearRect(0, 0, width, height);

			ctx.save();

			ctx.fillStyle = color ? color.hex_code : null;
			ctx.beginPath();
			ctx.moveTo(cx, cy);
			ctx.arc(cx, cy, width / 2, -Math.PI / 2, -Math.PI / 2 + percentage * 2 * Math.PI);
			ctx.lineTo(cx, cy);
			ctx.closePath();
			ctx.fill();

			ctx.restore();
		}
	}

	render() {
		const {
			currentTimer,
			isDisabled,
		} = this.props;

		const {
			autoPlay,
			sound,
		} = this.state;

		return (
			<div className="timer-display">
				<div className="progress-circle">
					<canvas className="outer-circle" ref={canvas => this.canvasRef = canvas} height="600px" width="600px" style={{ display: currentTimer ? "block" : "none" }}></canvas>
					<div className="inner-circle">
						<p>{this.getTimeDisplay()}</p>
					</div>
				</div>
				{
					!isDisabled &&
					<>
						{
							currentTimer &&
							<h3>{currentTimer.title}</h3>
						}
						<div className="btn-group">
							<Button icon={faStepBackward} color="faded-grey" onClick={() => this.changeTimer(false, false)} aria-label="Previous timer" />
							{
								this.isPaused()
									? <Button icon={faPlay} color="faded-grey" onClick={this.play} aria-label="Play" />
									: <Button icon={faPause} color="faded-grey" onClick={this.pause} aria-label="Pause" />
							}
							<Button icon={faStop} color="faded-grey" onClick={this.stop} aria-label="Stop" />
							<Button icon={faStepForward} color="faded-grey" onClick={() => this.changeTimer(true, false)} aria-label="Next timer" />
						</div>
						<div className="btn-group">
							<Button icon={autoPlay ? faLink : faUnlink} color={autoPlay ? "dark-grey" : "faded-grey"} onClick={() => this.setState({ autoPlay: !autoPlay })}>Auto-play: {autoPlay ? "On" : "Off"}</Button>
							<Button icon={sound ? faVolumeUp : faVolumeMute} color={sound ? "dark-grey" : "faded-grey"} onClick={() => this.setState({ sound: !sound })}>Sound: {sound ? "On" : "Off"}</Button>
						</div>
					</>
				}
			</div>
		)
	}
}

export default TimerDisplay;
