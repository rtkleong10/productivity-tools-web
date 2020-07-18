import React from 'react';
import { faClock, faUser, faSignOutAlt, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet";

import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function HomePage() {

	return (
		<div className="container">
			<Helmet>
				<title>Productivity Tools</title>
			</Helmet>
			<Breadcrumbs
				breadcrumbs={[
					{ title: "Home" },
				]} />
			<h1>Welcome to Productivity Tools!</h1>
			<div className="mb-30 btn-group">
				<Button isLink={true} to="/profile" icon={faUser}>Profile</Button>
				<Button isLink={true} to="/logout" color="faded-grey" icon={faSignOutAlt}>Log Out</Button>
			</div>
			<div className="btn-group btn-group-vertical">
				<Button isLink={true} to="/days-since" color="blue" icon={faCalendar}>Days Since</Button>
				<Button isLink={true} to="/time-cycles" color="purple" icon={faClock}>Time Cycles</Button>
			</div>
		</div>
	)
}
