import React, { forwardRef } from 'react'
import Button from '../../components/Button';
import { faEdit, faTrash, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './index.scss';
import { durationStrToMMss } from '../../utils/time';
import FadeTransition from '../../components/FadeTransition';

export const TimerItem = forwardRef((props, ref) => {
	const {
		timer: {
			title,
			duration,
			color: colorId,
		},
		colors,
		isEditable,
		isCurrentTimer,
		openEditModal,
		openDeleteModal,
		moveUpTimer,
		moveDownTimer,
	} = props;

	return (
		<div className={`timer-item${isCurrentTimer ? " current-timer-item" : ""}`} ref={ref}>
			<div className="item">
				<div>
					<div>
						<h3 className="mb-0">{title}</h3>
						<p className="mb-0">{durationStrToMMss(duration)}</p>
					</div>
					<FadeTransition in={isEditable}>
						<div className="btn-group mt-10">
							<Button icon={faEdit} color="green" size="sm" onClick={openEditModal} aria-label="Edit" />
							<Button icon={faTrash} color="red" size="sm" onClick={openDeleteModal} aria-label="Delete" />
						</div>
					</FadeTransition>
				</div>
				<FadeTransition in={isEditable}>
					<div className="btn-group btn-group-vertical">
						{moveUpTimer && <Button icon={faChevronUp} color="white" size="sm" onClick={moveUpTimer} aria-label="Move up" />}
						{moveDownTimer && <Button icon={faChevronDown} color="white" size="sm" onClick={moveDownTimer} aria-label="Move down" />}
					</div>
				</FadeTransition>
			</div>
			<div className="timer-colour" style={{ backgroundColor: colors.find(color => color.id === colorId).hex_code }}></div>
		</div>
	)
});

export default TimerItem;
