import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, getTokenConfig, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'timers';

// REDUCER
const timersReducer = createApiReducer(ENTITY_NAME);
export default timersReducer;

// OPERATIONS
export const createTimer = (cycleId, { title, duration, color }) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    return axios.post(
        `${API_URL}/cycles/${cycleId}/${ENTITY_NAME}/`,
        {
            title,
            duration,
            color,
        },
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to create timer.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE, err));
        });
    ;
};

export const retrieveTimer = (cycleId, timerId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, timerId));

    return axios.get(
        `${API_URL}/cycles/${cycleId}/${ENTITY_NAME}/${timerId}/`,
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch timer.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
        });
    ;
};

export const updateTimer = (cycleId, { id, title, duration, color }) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE, id));

    return axios.patch(
        `${API_URL}/cycles/${cycleId}/${ENTITY_NAME}/${id}/`,
        {
            title,
            duration,
            color,
        },
        getTokenConfig(getState)
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to update timer.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE, err));
        });
};

export const deleteTimer = (cycleId, timerId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    return axios.delete(
        `${API_URL}/cycles/${cycleId}/${ENTITY_NAME}/${timerId}/`,
        getTokenConfig(getState)
    )
        .then(() => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, timerId));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to delete timer.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE, err));
        });
};

export const listTimers = cycleId => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    return axios.get(
        `${API_URL}/cycles/${cycleId}/${ENTITY_NAME}/`,
        getTokenConfig(getState),
    )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch timers.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST, err));
        });
};

export const moveUpTimer = (cycleId, timerId) => (dispatch, getState) => {
	return axios.post(
        `${API_URL}/cycles/${cycleId}/timers/${timerId}/move-up/`,
        {},
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to move up timer.");
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST, err));
		});
	;
};

export const moveDownTimer = (cycleId, timerId) => (dispatch, getState) => {
	return axios.post(
        `${API_URL}/cycles/${cycleId}/timers/${timerId}/move-down/`,
        {},
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to move down timer.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST, err));
		});
	;
};

// SELECTORS
export const selectTimersLoading = state => state.timersReducer.loading[METHODS.LIST] === true;
export const selectTimersError = state => state.timersReducer.error[METHODS.LIST];
export const selectTimers = state => state.timersReducer.items;

export const selectTimerLoading = state => state.timersReducer.loading[METHODS.RETRIEVE] === true;
export const selectTimerError = state => state.timersReducer.error[METHODS.RETRIEVE];
export const selectTimer = state => state.timersReducer.item;
