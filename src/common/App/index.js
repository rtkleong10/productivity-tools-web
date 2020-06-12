import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import LogoutPage from '../LogoutPage';
import SignupPage from '../SignupPage';
import ActivityListPage from '../../days-since/ActivityListPage';
import ActivityDetailPage from '../../days-since/ActivityDetailPage';

export default function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					path="/"
					exact
					component={HomePage}
					/>
				<Route
					path="/login"
					exact
					component={LoginPage}
					/>
				<Route
					path="/logout"
					exact
					component={LogoutPage}
					/>
				<Route
					path="/signup"
					exact
					component={SignupPage}
					/>
				<Route
					path="/days-since"
					exact
					component={ActivityListPage}
					/>
				<Route
					path="/days-since/:id"
					exact
					component={ActivityDetailPage}
					/>
				<Redirect
					from="/"
					to="/not-found"
					/>
			</Switch>
		</BrowserRouter>
	)
}
