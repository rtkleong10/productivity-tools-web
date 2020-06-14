import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import SignupPage from './SignupPage';
import ProfilePage from './ProfilePage';

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
	{
		path: "/logout",
		exact: true,
		component: LogoutPage,
	},
];

export const USER_AUTH_ROUTES = [
	{
		path: "/logout",
		exact: true,
		component: LogoutPage,
	},
	{
		path: "/profile",
		exact: true,
		component: ProfilePage,
	},
];
