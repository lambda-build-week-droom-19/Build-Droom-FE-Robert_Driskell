import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, NICHES_SUCCESS } from "../actions"

const initialState = {
    isLogging: false,
    error: '',
    niches: []
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                isLogging: true,
                error: '',
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogging: false,
                error: '',
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLogging: false,
                error: action.payload,
            }
        case NICHES_SUCCESS:

            return{
                ...state,
                niches: action.payload
            }
        default:
            return state;
    }
};

