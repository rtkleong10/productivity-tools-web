import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, getTokenConfig, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'activities';

// REDUCER
const activitiesReducer = createApiReducer(ENTITY_NAME);
export default activitiesReducer;

// OPERATIONS
export const createActivity = ({ title, description, frequency, color }) => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

	return axios.post(
		`${API_URL}/${ENTITY_NAME}/`,
		{
			title,
			description,
			frequency,
			color,
		},
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, {
				...res.data,
				days_since: 0,
			}));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to create activity.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE, err));
		});
	;
};

export const retrieveActivity = activityId => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, activityId));

	return axios.get(
		`${API_URL}/${ENTITY_NAME}/${activityId}/`,
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch activity.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
		});
	;
};

export const updateActivity = ({ id, title, description, frequency, color }) => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE, id));

	return axios.patch(
		`${API_URL}/${ENTITY_NAME}/${id}/`,
		{
			title,
			description,
			frequency,
			color,
		},
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to update activity.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE, err));
		});
};

export const deleteActivity = activityId => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

	return axios.delete(
		`${API_URL}/${ENTITY_NAME}/${activityId}/`,
		getTokenConfig(getState)
	)
		.then(() => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, activityId));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to delete activity.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE, err));
		});
};

export const listActivities = () => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

	return axios.get(
		`${API_URL}/${ENTITY_NAME}/`,
		getTokenConfig(getState),
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch activities.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST, err));
		});
};

// SELECTORS
export const selectActivitiesLoading = state => state.activitiesReducer.loading[METHODS.LIST] === true;
export const selectActivitiesError = state => state.activitiesReducer.error[METHODS.LIST];
export const selectActivities = state => state.activitiesReducer.items;

export const selectActivityLoading = state => state.activitiesReducer.loading[METHODS.RETRIEVE] === true;
export const selectActivityError = state => state.activitiesReducer.error[METHODS.RETRIEVE];
export const selectActivity = state => state.activitiesReducer.item;
export const selectActivityId = state => state.activitiesReducer.itemId;
