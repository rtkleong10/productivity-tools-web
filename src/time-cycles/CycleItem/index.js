import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';

export const CycleItem = forwardRef((props, ref) => {
	const {
		cycle: {
			id,
			title,
			total_duration,
		},
		cycle,
		openEditModal,
		openDeleteModal,
	} = props;

	return (
		<div className="item" ref={ref}>
			<div className="mb-10">
				<h3 className="mb-0">
					<Link to={`/time-cycles/${id}`}>{title}</Link>
				</h3>
				<p>{total_duration}</p>
			</div>
			<div className="btn-group">
				<Button icon={faEdit} color="green" size="sm" onClick={() => openEditModal(cycle)} aria-label="Edit" />
				<Button icon={faTrash} color="red" size="sm" onClick={() => openDeleteModal(cycle)} aria-label="Delete" />
			</div>
		</div>
	);
});

export default CycleItem;
