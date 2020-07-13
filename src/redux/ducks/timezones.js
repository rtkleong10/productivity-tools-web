import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { getActionTypes, createAction, displayErrorMsgOrUnauth } from './helpers';

// ACTION TYPES
export const TIMEZONES_ACTIONS = getActionTypes('TIMEZONES');

// REDUCER
const initialState = {
	items: [],
	loading: true,
	error: null,
};

export default function timezonesReducer(state = initialState, action) {
	switch (action.type) {
		case TIMEZONES_ACTIONS.REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}

		case TIMEZONES_ACTIONS.SUCCESS:
			return {
				...state,
				items: action.payload,
				loading: false,
			}

		case TIMEZONES_ACTIONS.FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}

		default:
			return state;
	}

}

// OPERATIONS
export const listTimezones = () => dispatch => {
	dispatch(createAction(TIMEZONES_ACTIONS.REQUEST));

	return axios.get(
		`${API_URL}/timezones/`,
	)
		.then(res => {
			dispatch(createAction(TIMEZONES_ACTIONS.SUCCESS, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch timezones.");
			dispatch(createAction(TIMEZONES_ACTIONS.FAILURE, err));
		});
};

// SELECTORS
export const selectTimezonesLoading = state => state.timezonesReducer.loading === true;
export const selectTimezonesError = state => state.timezonesReducer.error;
export const selectTimezones = state => state.timezonesReducer.items;
