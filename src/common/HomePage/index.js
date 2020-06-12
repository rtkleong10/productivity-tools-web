import React from 'react';
import { faClock, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import Button from '../../components/Button';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function HomePage() {
	return (
		<div className="container">
			<Breadcrumbs
				breadcrumbs={[
					{ title: "Home" },
				]} />
			<h1>Welcome to Productivity Tools!</h1>
			<div className="mb-30 btn-group btn-group-horizontal">
				<Button isLink={true} to="/profile" icon={faUser}>Profile</Button>
				<Button isLink={true} to="/logout" color="faded-grey" icon={faSignOutAlt}>Log Out</Button>
			</div>
			<div className="btn-group">
				<Button isLink={true} to="/days-since" color="blue" icon={faClock}>Days Since</Button>
				{/* <Button isLink={true} to="/progress-bars" color="green" icon={faSpinner}>Progress Bars</Button> */}
			</div>
		</div>
	)
}
