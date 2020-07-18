import { combineReducers } from 'redux';

import errorsReducer from './ducks/errors';
import authReducer from './ducks/auth';
import colorsReducer from './ducks/colors';
import timezonesReducer from './ducks/timezones';
import profileReducer from './ducks/profile';

import activitiesReducer from './ducks/activities';
import activityEventsReducer from './ducks/activityEvents';
import activityStatisticsReducer from './ducks/activityStatistics';

import cyclesReducer from './ducks/cycles';
import timersReducer from './ducks/timers';

export default combineReducers({
	// Common
	errorsReducer,
	authReducer,
	colorsReducer,
	timezonesReducer,
	profileReducer,

	// Days Since
	activitiesReducer,
	activityEventsReducer,
	activityStatisticsReducer,

	// Time Cycles
	cyclesReducer,
	timersReducer,
});