import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

const colors = [
	'dark-grey',
	'medium-grey',
	'faded-grey',
	'white',
	'blue',
	'red',
	'green',
	'purple',
];

const sizes = [
	'sm',
	'md',
]

export default function Button(props) {
	const {
		className,
		isLink,
		isRounded,
		size,
		color,
		icon,
		children,
		...rest
	} = props;

	var classList = ['btn'];

	if (className)
		classList.push(className);
	
	// Shape
	if (isRounded)
		classList.push('btn-rounded');
	
	// Icon
	if (icon)
		classList.push('btn-icon');
	
	// Size
	if (sizes.includes(size) && color !== 'md')
		classList.push(`btn-${size}`);

	// Color
	if (colors.includes(color) && color !== 'dark-grey')
		classList.push(`btn-${color}`);

	const contents = (
		<>
			{icon && <FontAwesomeIcon className={children ? "mr-10" : ""} icon={icon} />}
			{children}
		</>
	)
	
	if (isLink) {
		return (
			<Link className={classList.join(" ")} {...rest}>
				{contents}
			</Link>
		)
	} else {
		return (
			<button className={classList.join(" ")} {...rest}>
				{contents}
			</button>
		)
	}
}

Button.propTypes = {
	className: PropTypes.string,
	isLink: PropTypes.bool,
	isRounded: PropTypes.bool,
	icon: PropTypes.object,
	size: PropTypes.oneOf(sizes),
	color: PropTypes.oneOf(colors),
	children: PropTypes.string,
}