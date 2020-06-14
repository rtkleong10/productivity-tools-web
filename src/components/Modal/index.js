import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './index.scss';
import Button from '../Button';

const ESCAPE_KEY = 27;
const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			draftIsVisible: false,
		};

		this.el = document.createElement('div');
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyDown);
		modalRoot.appendChild(this.el);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyDown);
		modalRoot.removeChild(this.el);
	}

	handleKeyDown = e => {
		switch (e.keyCode) {
			case ESCAPE_KEY:
				this.handleClose();
				break;

			default:
				break;
		}
	}

	handleClose = () => {
		const {
			onVisibilityChange,
		} = this.props;

		this.setState({
			draftIsVisible: false
		});

		if (onVisibilityChange)
			onVisibilityChange(false);
	}

	render() {
		const {
			title,
			children,
			isVisible,
			onVisibilityChange,
			...rest
		} = this.props;

		const {
			draftIsVisible,
		} = this.state;

		var finalIsVisible = isVisible !== null && isVisible !== undefined ? isVisible : draftIsVisible;

		return ReactDOM.createPortal(
			(
				<div className={`modal${finalIsVisible ? '' : ' modal-hide'}`} {...rest}>
					<div className="modal-bg" onClick={this.handleClose}></div>
					<div className="modal-content">
						{
							title && (
								<div className="modal-header">
									<p className="modal-title">{title}</p>
									<Button className="modal-close-button" color="white" icon={faTimes} onClick={this.handleClose} />
								</div>
							)
						}
						{children}
					</div>
				</div>
			),
			this.el
		);
	}
}

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired,
	isVisible: PropTypes.bool,
	onVisibilityChange: PropTypes.func,
}

export default Modal;
