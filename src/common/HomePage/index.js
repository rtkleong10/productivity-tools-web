import React from 'react';
import { faClock, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';

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
			<div className="btn-group">
				<Button isLink={true} to="/profile" color="faded-grey" icon={faUser}>Profile</Button>
				<Button isLink={true} to="/days-since" color="blue" icon={faClock}>Days Since</Button>
				{/* <Button isLink={true} to="/progress-bars" color="green" icon={faSpinner}>Progress Bars</Button> */}
			</div>
		</div>
	)
}
