import React from 'react';
import { Helmet } from "react-helmet";

import Breadcrumbs from '../../components/Breadcrumbs';
import ActivityList from '../ActivityList';

export default function ActivityListPage() {
	return (
		<div className="container">
			<Helmet>
				<title>Days Since</title>
			</Helmet>
			<Breadcrumbs
				breadcrumbs={[
					{ title: "Home", to: "/" },
					{ title: "Days Since" },
				]} />
			<h1>Days Since</h1>
			<ActivityList />
		</div>
	);
}
