import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../components/Loader';
import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';
import { GUEST_AUTH_ROUTES, USER_AUTH_ROUTES } from '../../auth/routes';
import DAYS_SINCE_ROUTES from '../../days-since/routes';
import { refreshTokenLogin, selectRefreshToken, selectAccessToken, selectLoginLoading, selectLoginError } from '../../redux/ducks/auth';

export class AppRouter extends Component {
	componentDidMount() {
		const {
			refreshToken,
			refreshTokenLogin,
		} = this.props;

		if (refreshToken)
			refreshTokenLogin();
	}

	render() {
		const {
			loginLoading,
			loginError,
			refreshToken,
			accessToken,
		} = this.props;

		if ((refreshToken && !accessToken) || loginLoading)
			return <Loader />;

		if (!accessToken || loginError) {
			return (
				<BrowserRouter>
					<Switch>
						{
							GUEST_AUTH_ROUTES.map((route, i) => <Route key={i} {...route} />)
						}
						<Redirect
							from="/logout"
							exact
							to="/login"
						/>
						<Redirect
							from="/"
							exact
							to="/login"
						/>
						<Route
							path="/not-found"
							exact
							component={NotFoundPage}
						/>
						<Redirect
							from="/"
							to="/not-found"
						/>
					</Switch>
				</BrowserRouter>
			);

		} else {
			let allRoutes = [
				...USER_AUTH_ROUTES,
				...DAYS_SINCE_ROUTES,
			];

			return (
				<BrowserRouter>
					<Switch>
						<Route
							path="/"
							exact
							component={HomePage}
						/>
						{
							allRoutes.map((route, i) => <Route key={i} {...route} />)
						}
						{
							GUEST_AUTH_ROUTES.map((route, i) => (
								<Redirect
									key={`auth-${i}`}
									from={route.path}
									exact
									to="/"
								/>
							))
						}
						<Route
							path="/not-found"
							exact
							component={NotFoundPage}
						/>
						<Redirect
							from="/"
							to="/not-found"
						/>
					</Switch>
				</BrowserRouter>
			)
		}
	}
}

const mapStateToProps = state => ({
	loginLoading: selectLoginLoading(state),
	loginError: selectLoginError(state),
	refreshToken: selectRefreshToken(state),
	accessToken: selectAccessToken(state),
});

const dispatchers = {
	refreshTokenLogin,
};

export default connect(mapStateToProps, dispatchers)(AppRouter);
