import { combineReducers } from 'redux';

import authReducer from './ducks/auth';
import colorsReducer from './ducks/colors';
import timezonesReducer from './ducks/timezones';
import profileReducer from './ducks/profile';
import activitiesReducer from './ducks/activities';
import activityEventsReducer from './ducks/activityEvents';

export default combineReducers({
	authReducer,
	colorsReducer,
	timezonesReducer,
	profileReducer,
	activitiesReducer,
	activityEventsReducer,
});