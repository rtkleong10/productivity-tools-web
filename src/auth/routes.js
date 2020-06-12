import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import SignupPage from './SignupPage';

export const GUEST_AUTH_ROUTES = [
	{
		path: "/login",
		exact: true,
		component: LoginPage,
	},
	{
		path: "/signup",
		exact: true,
		component: SignupPage,
	},
];

export const USER_AUTH_ROUTES = [
	{
		path: "/logout",
		exact: true,
		component: LogoutPage,
	},
];
