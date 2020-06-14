import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DeleteForm(props) {
    const {
        onSubmit
    } = props;

    return (
		<div className="btn-group btn-group">
			<Button icon={faTrash} color="red" onClick={() => onSubmit(true)}>Confirm</Button>
			<Button color="faded-grey" onClick={() => onSubmit(false)}>Cancel</Button>
        </div>
    )
}

DeleteForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}