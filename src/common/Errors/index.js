import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { closeError, selectErrors } from '../../redux/ducks/errors';
import './index.scss';
import Button from '../../components/Button';

export class Errors extends Component {
	render() {
		const {
			errors,
			closeError,
		} = this.props;

		return (
			<div className="error-wrapper">
				{
					errors.map(error => {
						const {
							id,
							isVisible,
							message,
						} = error;

						return (
							<div className={`box error${isVisible ? "" : " error-hide"}`} key={id}>
								<div className="error-header">
									<p className="m-0">Error</p>
									<Button className="error-close-button" color="white" icon={faTimes} onClick={() => closeError(id)} />
								</div>
								<p className="m-0">{message}</p>
							</div>
						)
					})
				}
			</div>
		)
	}
}

Errors.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		isVisible: PropTypes.bool.isRequired,
		message: PropTypes.string.isRequired,
	}).isRequired).isRequired,
	closeError: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	errors: selectErrors(state),
});

const dispatchers = {
	closeError,
};

export default connect(mapStateToProps, dispatchers)(Errors);
