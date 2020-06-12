import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import LogoutPage from '../LogoutPage';
import SignupPage from '../SignupPage';
import ActivityListPage from '../../days-since/ActivityListPage';

export default function App() {
	return (
		<BrowserRouter>
			{/* <Header /> */}
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
				<Redirect
					from="/"
					to="/not-found"
				/>
			</Switch>
			{/* <Footer /> */}
		</BrowserRouter>
	)
}
