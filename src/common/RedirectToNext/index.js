import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default function RedirectToNext(props) {
	const next = new URLSearchParams(props.location.search).get("next");
	return <Redirect to={`/${next ? next : ""}`} />;
};

RedirectToNext.propTypes = {
	location: PropTypes.shape({
		search: PropTypes.string.isRequired,
	}).isRequired,
};
