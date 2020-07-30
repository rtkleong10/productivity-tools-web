import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Breadcrumbs(props) {
	const {
		breadcrumbs,
		...rest
	} = props;

	return (
		<p {...rest}>
			{
				breadcrumbs.map((breadcrumb, i) => {
					const {
						title,
						className,
						to,
						...rest
					} = breadcrumb;


					if (i < breadcrumbs.length - 1) {
						return (
							<Fragment key={i}>
								<Link to={to} {...rest}>{title}</Link>
								<FontAwesomeIcon icon={faChevronRight} className="mx-5" />
							</Fragment>
						)

					} else {
						return <span key={i} {...rest}>{title}</span>;
					}
				})
			}
		</p>
	)
}

Breadcrumbs.propTypes = {
	breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string.isRequired,
		className: PropTypes.string,
		to: PropTypes.string,
	}).isRequired).isRequired
}
