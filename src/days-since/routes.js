import ActivityListPage from './ActivityListPage';
import ActivityDetailPage from './ActivityDetailPage';

export const ROUTES = [
	{
		path: "/days-since",
		exact: true,
		component: ActivityListPage,
	},
	{
		path: "/days-since/:id",
		exact: true,
		component: ActivityDetailPage,
	}
]

export default ROUTES;
