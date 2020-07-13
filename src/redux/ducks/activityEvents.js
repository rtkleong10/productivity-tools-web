import axios from 'axios';

import { ENTITY_NAME as ACTIVITIES_ENTITY_NAME } from './activities';
import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, getTokenConfig, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'activityevents';

// REDUCER
const activityEventsReducer = createApiReducer(ENTITY_NAME);
export default activityEventsReducer;

// OPERATIONS
export const performEvent = (activityId, event_type) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    return axios.post(
        `${API_URL}/activities/${activityId}/events/`,
        {
            event_type,
        },
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
            dispatch(createApiAction(ACTIVITIES_ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, {
                id: activityId,
                days_since: 0,
                last_event_type: event_type,
                todays_event: event_type,
            }));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to perform event.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE, err));
        });
    ;
};

export const createActivityEvent = (activityId, { event_type, date, description }) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    return axios.post(
        `${API_URL}/activities/${activityId}/events/`,
        {
            event_type,
            date,
            description,
        },
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to create event.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE, err));
        });
    ;
};

export const retrieveActivityEvent = (activityId, activityEventId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, activityEventId));

    return axios.get(
        `${API_URL}/activities/${activityId}/events/${activityEventId}/`,
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch event.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
        });
    ;
};

export const updateActivityEvent = (activityId, { id, event_type, date, description }) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE, id));

    return axios.patch(
        `${API_URL}/activities/${activityId}/events/${id}/`,
        {
            event_type,
            date,
            description,
        },
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to update event.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE, err));
        });
};

export const deleteActivityEvent = (activityId, activityEventId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    return axios.delete(
        `${API_URL}/activities/${activityId}/events/${activityEventId}/`,
        getTokenConfig(getState)
    )
        .then(() => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, activityEventId));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to delete event.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE, err));
        });
};

export const listActivityEvents = activityId => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    return axios.get(
        `${API_URL}/activities/${activityId}/events/`,
        getTokenConfig(getState),
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch events.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST, err));
        });
};

// SELECTORS
export const selectActivityEventsLoading = state => state.activityEventsReducer.loading[METHODS.LIST] === true;
export const selectActivityEventsError = state => state.activityEventsReducer.error[METHODS.LIST];
export const selectActivityEvents = state => state.activityEventsReducer.items;

export const selectActivityEventLoading = state => state.activityEventsReducer.loading[METHODS.RETRIEVE] === true;
export const selectActivityEventError = state => state.activityEventsReducer.error[METHODS.RETRIEVE];
export const selectActivityEvent = state => state.activityEventsReducer.item;
