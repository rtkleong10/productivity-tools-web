import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getTextWithBrs } from '../../utils/text';
import './index.scss';

function getClockDisplay(daysLeft, isMobile = false) {
	if (daysLeft >= 0) {
		if (daysLeft === 1)
			return "1 day\nleft";
		else if (daysLeft > 99)
			return ">99 days\nleft";
		else
			return `${daysLeft} days\nleft`;

	} else {
		if (daysLeft === -1)
			return "1 day\nlate";
		else if (daysLeft < -99)
			return ">99 days\nlate";
		else
			return `${Math.abs(daysLeft)} days\nlate`;
	}
}

export default function DaysSinceDisplay(props) {
	const animationTime = 800;
	const startTime = new Date();

	let canvasRef = useRef();

	const {
		days_since,
		frequency,
		color,
	} = props;

	const daysLeft = frequency - days_since;
	const clockDisplay = getClockDisplay(daysLeft);
	const percentage = days_since / frequency;

	useEffect(() => {
		let canvas = canvasRef.current;

		if (canvas) {
			let ctx = canvas.getContext('2d');

			const draw = () => {
				let width = canvas.width;
				let height = canvas.height;

				var cx = width / 2;
				var cy = height / 2;

				const timeElapsed = new Date() - startTime;
				const multiplier = (timeElapsed < animationTime) ? (Math.pow(Math.sin(Math.PI * (timeElapsed / animationTime) / 2), 2)) : 1;

				ctx.globalCompositeOperation = 'destination-over';
				ctx.clearRect(0, 0, width, height);

				ctx.save();

				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.moveTo(cx, cy);
				ctx.arc(cx, cy, width / 2, -Math.PI / 2, -Math.PI / 2 + percentage * 2 * Math.PI * multiplier);
				ctx.lineTo(cx, cy);
				ctx.closePath();
				ctx.fill();

				ctx.restore();

				if (timeElapsed < animationTime)
					requestAnimationFrame(draw);
			}

			draw();
		}
	}, [startTime, color, percentage]);

	const innerCircle = (
		<div className="inner-circle">
			<p>{getTextWithBrs(clockDisplay)}</p>
			<p className="mobile-text">{Math.abs(daysLeft) <= 99 ? `${Math.abs(daysLeft)}d` : ">99d"}<br />{`${daysLeft >= 0 ? 'left' : 'late'}`}</p>
		</div>
	)

	// Not overdue
	if (daysLeft >= 0) {
		return (
			<div className="days-since-display progress-circle">
				<canvas className="outer-circle" ref={canvasRef} height="200px" width="200px"></canvas>
				{innerCircle}
			</div >
		)

	// Overdue
	} else {
		return (
			<div className="days-since-display progress-circle" style={{ backgroundColor: color }}>
				<div className="outer-circle outer-circle-overdue"></div>
				{innerCircle}
			</div>
		)
	}
}

DaysSinceDisplay.propTypes = {
	days_since: PropTypes.number.isRequired,
	frequency: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
}