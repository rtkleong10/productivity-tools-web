import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { getActionTypes, createAction, displayErrorMsgOrUnauth } from './helpers';

// ACTION TYPES
export const COLORS_ACTIONS = getActionTypes('COLORS');

// REDUCER
const initialState = {
	items: [],
	loading: true,
	error: null,
};

export default function colorsReducer(state = initialState, action) {
	switch (action.type) {
		case COLORS_ACTIONS.REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}

		case COLORS_ACTIONS.SUCCESS:
			return {
				...state,
				items: action.payload,
				loading: false,
			}

		case COLORS_ACTIONS.FAILURE:
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
export const listColors = () => dispatch => {
	dispatch(createAction(COLORS_ACTIONS.REQUEST));

	return axios.get(
		`${API_URL}/colors/`,
	)
		.then(res => {
			dispatch(createAction(COLORS_ACTIONS.SUCCESS, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch colours.");
			dispatch(createAction(COLORS_ACTIONS.FAILURE, err));
		});
};

// SELECTORS
export const selectColorsLoading = state => state.colorsReducer.loading === true;
export const selectColorsError = state => state.colorsReducer.error;
export const selectColors = state => state.colorsReducer.items;
