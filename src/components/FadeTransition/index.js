import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './index.scss';

export default function FadeTransition(props) {
	return (
		<CSSTransition
			classNames="fade-transition"
			timeout={300}
			unmountOnExit
			{...props}
		/>
	)
}
