import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Errors from '../Errors';
import Loader from '../../components/Loader';
import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';

import { GUEST_AUTH_ROUTES, USER_AUTH_ROUTES } from '../../auth/routes';
import DAYS_SINCE_ROUTES from '../../days-since/routes';
import TIME_CYCLES_ROUTES from '../../time-cycles/routes';

import { refreshTokenLogin, selectRefreshToken, selectAccessToken, selectLoginLoading, selectLoginError } from '../../redux/ducks/auth';

const RedirectToNext = props => {
	const next = new URLSearchParams(props.location.search).get("next");
	return <Redirect to={`/${next ? next : ""}`} />;
};

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
				<Router>
					<Errors />
					<Switch>
						{
							GUEST_AUTH_ROUTES.map((route, i) => <Route key={i} {...route} />)
						}
						<Redirect
							from="/:next"
							exact
							to="/login?next=:next"
						/>
						<Redirect
							from="/"
							exact
							to="/login"
						/>
					</Switch>
				</Router>
			);

		} else {
			let allRoutes = [
				...USER_AUTH_ROUTES,
				...DAYS_SINCE_ROUTES,
				...TIME_CYCLES_ROUTES,
			];

			return (
				<Router>
					<Errors />
					<Switch>
						<Route
							path="/"
							exact
							component={HomePage}
						/>
						{
							allRoutes.map((route, i) => <Route key={i} {...route} />)
						}
						<Route
							path="/login"
							exact
							component={RedirectToNext}
						/>
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
				</Router>
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
