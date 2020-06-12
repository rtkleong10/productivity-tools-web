import axios from 'axios';
import Cookies from 'js-cookie';

import { AUTH_URL } from '../../utils/constants';
import { getActionTypes, actionCreator } from './helpers';

// ACTION TYPES
export const LOGIN_ACTIONS = getActionTypes('LOGIN');
export const SIGNUP_ACTIONS = getActionTypes('SIGNUP');
export const LOGOUT = 'LOGOUT';

// REDUCER
const initialState = {
	accessToken: Cookies.get("accessToken"),
	refreshToken: Cookies.get("refreshToken"),
	loginLoading: false,
	loginError: null,
	signupLoading: false,
	signupError: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN_ACTIONS.REQUEST:
			return {
				...state,
				loginLoading: true,
				loginError: null,
			}
			
		case LOGIN_ACTIONS.FAILURE:
			Cookies.remove("accessToken");
			Cookies.remove("refreshToken");
			
			return {
				...state,
				accessToken: null,
				refreshToken: null,
				loginLoading: false,
				loginError: action.payload,
			}
			
		case LOGIN_ACTIONS.SUCCESS:
			const {
				access: accessToken,
				refresh: refreshToken,
			} = action.payload;

			Cookies.set("accessToken", accessToken);
			Cookies.set("refreshToken", refreshToken);

			return {
				...state,
				accessToken: accessToken,
				refreshToken: refreshToken,
				loginLoading: false,
			}

		case LOGOUT:
			Cookies.remove("accessToken");
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
	dispatch(actionCreator(LOGIN_ACTIONS.REQUEST));

	axios.post(
		`${AUTH_URL}/jwt/create`,
		{
			username,
			password,
		}
	)
		.then(res => {
			dispatch(actionCreator(LOGIN_ACTIONS.SUCCESS, res.data));
		})
		.catch(err => {
			dispatch(actionCreator(LOGIN_ACTIONS.FAILURE, err));
		});
};

export const refreshTokenLogin = () => (dispatch, getState) => {
	dispatch(actionCreator(LOGIN_ACTIONS.REQUEST));
	const refreshToken = getState().authReducer.refreshToken;

	axios.post(
		`${AUTH_URL}/jwt/refresh`,
		{
			refresh: refreshToken,
		}
	)
		.then(res => {
			dispatch(actionCreator(LOGIN_ACTIONS.SUCCESS, {
				...res.data,
				refresh: refreshToken,
			}));
		})
		.catch(err => {
			dispatch(actionCreator(LOGIN_ACTIONS.FAILURE, err));
		});
};

export const signup = ({ email, username, password }) => dispatch => {
	dispatch(actionCreator(SIGNUP_ACTIONS.REQUEST));

	axios.post(
		`${AUTH_URL}/users`,
		{
			email,
			username,
			password,
		}
	)
		.then(res => {
			dispatch(actionCreator(SIGNUP_ACTIONS.SUCCESS, res.data));
		})
		.catch(err => {
			// displayError("Unable to sign up")(dispatch);
			dispatch(actionCreator(SIGNUP_ACTIONS.FAILURE, err));
		});
};

export const logout = () => dispatch => {
	dispatch(actionCreator(LOGOUT));
};

// SELECTORS
export const selectLoginLoading = state => state.authReducer.loginLoading;
export const selectLoginError = state => state.authReducer.loginError;
export const selectRefreshToken = state => state.authReducer.refreshToken;