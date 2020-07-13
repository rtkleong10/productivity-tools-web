import axios from 'axios';

import { API_URL } from '../../utils/constants';
import { STATUSES, METHODS, createApiAction, createApiReducer, getTokenConfig, displayErrorMsgOrUnauth } from './helpers';

export const ENTITY_NAME = 'profile';

// REDUCER
const profileReducer = createApiReducer(ENTITY_NAME);
export default profileReducer;

// OPERATIONS
export const retrieveProfile = () => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

	return axios.get(
		`${API_URL}/${ENTITY_NAME}/`,
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to fetch profile.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE, err));
		});
	;
};

export const updateProfile = ({ timezone }) => (dispatch, getState) => {
	dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

	return axios.patch(
		`${API_URL}/${ENTITY_NAME}/`,
		{
			timezone,
		},
		getTokenConfig(getState)
	)
		.then(res => {
			dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
		})
		.catch(err => {
			displayErrorMsgOrUnauth(err, dispatch, "Unable to update profile.");
			dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE, err));
		});
};

// SELECTORS
export const selectProfileLoading = state => state.profileReducer.loading[METHODS.RETRIEVE] === true;
export const selectProfileError = state => state.profileReducer.error[METHODS.RETRIEVE];
export const selectProfile = state => state.profileReducer.item;
