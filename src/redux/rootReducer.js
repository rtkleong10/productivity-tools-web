import { combineReducers } from 'redux';

import authReducer from './ducks/auth';
import activitiesReducer from './ducks/activities';
import activityEventsReducer from './ducks/activityEvents';

export default combineReducers({
	authReducer,
	activitiesReducer,
	activityEventsReducer,
});