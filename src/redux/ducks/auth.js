import axios from 'axios';
import Cookies from 'js-cookie';

import { AUTH_URL } from '../../utils/constants';
import { getActionTypes, createAction } from './helpers';

// ACTION TYPES
export const LOGIN_ACTIONS = getActionTypes('LOGIN');
export const SIGNUP_ACTIONS = getActionTypes('SIGNUP');
export const LOGOUT = 'LOGOUT';

// REDUCER
const initialState = {
	accessToken: null,
	refreshToken: Cookies.get("refreshToken"),
	loginLoading: false,
	loginError: null,
	signupLoading: false,
	signupError: null,
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_ACTIONS.REQUEST:
			return {
				...state,
				loginLoading: true,
				loginError: null,
			}

		case LOGIN_ACTIONS.SUCCESS:
			const {
				access: accessToken,
				refresh: refreshToken,
			} = action.payload;

			Cookies.set("refreshToken", refreshToken);

			return {
				...state,
				accessToken: accessToken,
				refreshToken: refreshToken,
				loginLoading: false,
			}

		case LOGIN_ACTIONS.FAILURE:
			Cookies.remove("refreshToken");

			return {
				...state,
				accessToken: null,
				refreshToken: null,
				loginLoading: false,
				loginError: action.payload,
			}
		
		case LOGOUT:
			Cookies.remove("refreshToken");

			return {
				...state,
				accessToken: null,
				refreshToken: null,
			}

		default:
			return state;
	}

}

// OPERATIONS
export const authLogin = ({ username, password }) => dispatch => {
	dispatch(createAction(LOGIN_ACTIONS.REQUEST));

	axios.post(
		`${AUTH_URL}/jwt/create/`,
		{
			username,
			password,
		}
	)
		.then(res => {
			dispatch(createAction(LOGIN_ACTIONS.SUCCESS, res.data));
		})
		.catch(err => {
			dispatch(createAction(LOGIN_ACTIONS.FAILURE, err));
		});
};

export const refreshTokenLogin = () => (dispatch, getState) => {
	dispatch(createAction(LOGIN_ACTIONS.REQUEST));
	const refreshToken = getState().authReducer.refreshToken;

	axios.post(
		`${AUTH_URL}/jwt/refresh/`,
		{
			refresh: refreshToken,
		}
	)
		.then(res => {
			dispatch(createAction(LOGIN_ACTIONS.SUCCESS, {
				...res.data,
				refresh: refreshToken,
			}));
		})
		.catch(err => {
			dispatch(createAction(LOGIN_ACTIONS.FAILURE, err));
		});
};

export const signup = ({ email, username, password }) => dispatch => {
	dispatch(createAction(SIGNUP_ACTIONS.REQUEST));

	axios.post(
		`${AUTH_URL}/users/`,
		{
			email,
			username,
			password,
		}
	)
		.then(res => {
			dispatch(createAction(SIGNUP_ACTIONS.SUCCESS, res.data));
		})
		.catch(err => {
			dispatch(createAction(SIGNUP_ACTIONS.FAILURE, err));
		});
};

export const logout = () => dispatch => {
	dispatch(createAction(LOGOUT));
};

// SELECTORS
export const selectRefreshToken = state => state.authReducer.refreshToken;
export const selectAccessToken = state => state.authReducer.accessToken;

export const selectLoginLoading = state => state.authReducer.loginLoading;
export const selectLoginError = state => state.authReducer.loginError;
