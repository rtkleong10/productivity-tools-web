// ACTIONS
export const STATUSES = {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
}

export const METHODS = {
    CREATE: 'CREATE',
    RETRIEVE: 'RETRIEVE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    LIST: 'LIST',
}

export function getActionTypes(actionName) {
    const actionNameUpper = actionName.toUpperCase()
	
    return {
        REQUEST: `${actionNameUpper}_${STATUSES.REQUEST}`,
		SUCCESS: `${actionNameUpper}_${STATUSES.SUCCESS}`,
		FAILURE: `${actionNameUpper}_${STATUSES.FAILURE}`,
    }
};

export function createAction(type, payload = null) {
	return {
		type,
		payload,
	}
};

export function createApiAction(entityName, status, method, payload) {
    return {
        type: `${entityName.toUpperCase()}_${status}_${method}`,
        payload: payload
    }
}

// REDUCER
export function createApiReducer(entityName, id="id") {
    const initialState = {
        loading: {
            [METHODS.CREATE]: true,
            [METHODS.RETRIEVE]: true,
            [METHODS.UPDATE]: true,
            [METHODS.DELETE]: true,
            [METHODS.LIST]: true,
        },
		error: {
			[METHODS.CREATE]: null,
            [METHODS.RETRIEVE]: null,
            [METHODS.UPDATE]: null,
            [METHODS.DELETE]: null,
            [METHODS.LIST]: null,
		},
        items: [],
        item: null,
    };

    return function reducer(state = initialState, action) {
        const actionTypePattern = /^(.+)_(.+)_(.+)$/;
        const match = action.type.match(actionTypePattern);

        if (!match)
            return state;

        const actionEntityName = match[1];
        const actionStatus = match[2];
        const actionMethod = match[3];

        if (actionEntityName !== entityName.toUpperCase() || !Object.values(METHODS).includes(actionMethod))
            return state;

        switch (actionStatus) {
            case STATUSES.REQUEST:
                return {
                    ...state,
                    loading: {
                        ...state.loading,
                        [actionMethod]: true
                    },
                    error: {
                        ...state.error,
                        [actionMethod]: null
                    },
                    item: (actionMethod === METHODS.RETRIEVE || actionMethod === METHODS.UPDATE) ? { [id]: action.payload } : state.item,
                };

            case STATUSES.SUCCESS:
                switch (actionMethod) {
                    case METHODS.CREATE:
                        return {
                            ...state,
                            loading: {
                                ...state.loading,
                                [actionMethod]: false
                            },
                            items: [...state.items, action.payload],
                        }

                    case METHODS.RETRIEVE:
                        return {
                            ...state,
                            loading: {
                                ...state.loading,
                                [actionMethod]: false
                            },
                            item: action.payload,
                        }
                        
                    case METHODS.UPDATE:
                        return {
                            ...state,
                            loading: {
                                ...state.loading,
                                [actionMethod]: false
                            },
                            items: state.items.map(item => (item[id] === action.payload[id]) ? action.payload : item),
                            item: action.payload,
                        }

                    case METHODS.DELETE:
                        return {
                            ...state,
                            loading: {
                                ...state.loading,
                                [actionMethod]: false
                            },
                            items: state.items.filter(item => item[id] !== action.payload),
                        }

                    case METHODS.LIST:
                        return {
                            ...state,
                            loading: {
                                ...state.loading,
                                [actionMethod]: false
                            },
                            items: action.payload,
                        }

                    default:
                        return state;
                }
            
            case STATUSES.FAILURE:
                return {
                    ...state,
                    loading: {
                        ...state.loading,
                        [actionMethod]: false
                    },
                    error: {
                        ...state.error,
                        [actionMethod]: action.payload
                    },
                };

            default:
                return state;
        }
    }
}

export const getTokenConfig = getState => {
    const token = getState().authReducer.accessToken

    const config = {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    };

    return config;
}
