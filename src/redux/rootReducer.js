import { combineReducers } from 'redux';

import errorsReducer from './ducks/errors';
import authReducer from './ducks/auth';
import colorsReducer from './ducks/colors';
import timezonesReducer from './ducks/timezones';
import profileReducer from './ducks/profile';
import activitiesReducer from './ducks/activities';
import activityEventsReducer from './ducks/activityEvents';
import activityStatisticsReducer from './ducks/activityStatistics';

export default combineReducers({
	errorsReducer,
	authReducer,
	colorsReducer,
	timezonesReducer,
	profileReducer,
	activitiesReducer,
	activityEventsReducer,
	activityStatisticsReducer,
});