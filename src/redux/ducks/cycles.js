import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, getTokenConfig, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'cycles';

// REDUCER
const cyclesReducer = createApiReducer(ENTITY_NAME);
export default cyclesReducer;

// OPERATIONS
export const createCycle = ({ title }) => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

	return axios.post(
		`${API_URL}/${ENTITY_NAME}/`,
		{
			title,
		},
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, {
				...res.data,
				total_duration: "00:00:00",
			}));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to create cycle.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE, err));
		});
	;
};

export const retrieveCycle = cycleId => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE, cycleId));

	return axios.get(
		`${API_URL}/${ENTITY_NAME}/${cycleId}/`,
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch cycle.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
		});
	;
};

export const updateCycle = ({ id, title }) => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE, id));

	return axios.patch(
		`${API_URL}/${ENTITY_NAME}/${id}/`,
		{
			title,
		},
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to update cycle.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE, err));
		});
};

export const deleteCycle = cycleId => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

	return axios.delete(
		`${API_URL}/${ENTITY_NAME}/${cycleId}/`,
		getTokenConfig(getState)
	)
		.then(() => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, cycleId));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to delete cycle.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE, err));
		});
};

export const listCycles = () => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

	return axios.get(
		`${API_URL}/${ENTITY_NAME}/`,
		getTokenConfig(getState),
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch cycles.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST, err));
		});
};

// SELECTORS
export const selectCyclesLoading = state => state.cyclesReducer.loading[METHODS.LIST] === true;
export const selectCyclesError = state => state.cyclesReducer.error[METHODS.LIST];
export const selectCycles = state => state.cyclesReducer.items;

export const selectCycleLoading = state => state.cyclesReducer.loading[METHODS.RETRIEVE] === true;
export const selectCycleError = state => state.cyclesReducer.error[METHODS.RETRIEVE];
export const selectCycle = state => state.cyclesReducer.item;
export const selectCycleId = state => state.cyclesReducer.itemId;
