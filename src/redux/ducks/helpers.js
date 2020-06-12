export function getActionTypes(actionName) {
    const actionNameUpper = actionName.toUpperCase()
	const actionRequest = actionNameUpper + '_REQUEST';
	const actionSuccess = actionNameUpper + '_SUCCESS';
	const actionFailure = actionNameUpper + '_FAILURE';
	
    return {
        REQUEST: actionRequest,
		SUCCESS: actionSuccess,
		FAILURE: actionFailure,
    }
};

export function actionCreator(type, payload = null) {
	return {
		type,
		payload,
	}
};