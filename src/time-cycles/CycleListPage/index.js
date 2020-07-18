import React from 'react';
import { Helmet } from "react-helmet";

import Breadcrumbs from '../../components/Breadcrumbs';
import CycleList from '../CycleList';

export default function CycleListPage() {
	return (
		<div className="container">
			<Helmet>
				<title>Time Cycles</title>
			</Helmet>
			<Breadcrumbs
				breadcrumbs={[
					{ title: "Home", to: "/" },
					{ title: "Time Cycles" },
				]} />
			<h1>Time Cycles</h1>
			<CycleList/>
		</div>
	);
}
