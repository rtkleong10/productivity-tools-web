import CycleListPage from './CycleListPage';
import CycleDetailPage from './CycleDetailPage';

export const ROUTES = [
	{
		path: "/time-cycles",
		exact: true,
		component: CycleListPage,
	},
	{
		path: "/time-cycles/:cycleId",
		exact: true,
		component: CycleDetailPage,
	}
]

export default ROUTES;
