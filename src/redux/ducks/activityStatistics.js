import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { getActionTypes, createAction, displayErrorMsgOrUnauth, getTokenConfig } from './helpers';

// ACTION TYPES
export const ACTIVITYSTATS_ACTIONS = getActionTypes('ACTIVITYSTATS');

// REDUCER
const initialState = {
	item: null,
	loading: true,
	error: null,
};

// OPERATIONS
export default function activityStatisticsReducer(state = initialState, action) {
	switch (action.type) {
		case ACTIVITYSTATS_ACTIONS.REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}

		case ACTIVITYSTATS_ACTIONS.SUCCESS:
			return {
				...state,
				item: action.payload,
				loading: false,
			}

		case ACTIVITYSTATS_ACTIONS.FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}

		default:
			return state;
	}

}

export const retrieveActivityStatistics = activityId => (dispatch, getState) => {
	dispatch(createAction(ACTIVITYSTATS_ACTIONS.REQUEST));

	return axios.get(
		`${API_URL}/activities/${activityId}/statistics/`,
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createAction(ACTIVITYSTATS_ACTIONS.SUCCESS, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch activity statistics.");
			dispatch(createAction(ACTIVITYSTATS_ACTIONS.FAILURE, err));
		});
	;
};

// SELECTORS
export const selectActivityStatisticsLoading = state => state.activityStatisticsReducer.loading === true;
export const selectActivityStatisticsError = state => state.activityStatisticsReducer.error;
export const selectActivityStatistics = state => state.activityStatisticsReducer.item;
