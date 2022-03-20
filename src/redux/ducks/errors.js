// ACTION TYPES
const ERROR_DISPLAY = 'ERROR_DISPLAY';
const ERROR_CLOSE = 'ERROR_CLOSE';
const ERROR_REMOVE = 'ERROR_REMOVE';

// REDUCER
const initialState = {
    errors: [],
};

export default function errorsReducer(state = initialState, action) {
    switch (action.type) {
        case ERROR_DISPLAY:
            return {
                ...state,
                errors: [...state.errors, action.payload],
            }

        case ERROR_CLOSE:
            return {
                ...state,
                errors: state.errors.map(error => error.id === action.payload ? { ...error, isVisible: false } : error),
            }
        
        case ERROR_REMOVE:
            return {
                ...state,
                errors: state.errors.filter(error => error.id !== action.payload),
            }

        default:
            return state;
    }
};

// ACTION CREATORS
function displayErrorAction(error) {
    return {
        type: ERROR_DISPLAY,
        payload: error,
    }
}

function closeErrorAction(id) {
    return {
        type: ERROR_CLOSE,
        payload: id,
    }
}

function removeErrorAction(id) {
    return {
        type: ERROR_REMOVE,
        payload: id,
    }
}

// OPERATIONS
export const displayError = errorMessage => dispatch => {
    // Generate unique ID
    const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);

    dispatch(displayErrorAction({
        id: uid,
        message: errorMessage,
        isVisible: true,
    }));

    // Dismiss error after 3 seconds
    setTimeout(() => dispatch(closeErrorAction(uid)), 3000);

    // Delete error after 5 seconds
    setTimeout(() => dispatch(removeErrorAction(uid)), 5000);
};

export const closeError = id => dispatch => {
    dispatch(closeErrorAction(id));

    // Delete error after 2 seconds
    setTimeout(() => dispatch(removeErrorAction(id)), 2000);
};

// SELECTORS
export const selectErrors = state => state.errorsReducer.errors;
