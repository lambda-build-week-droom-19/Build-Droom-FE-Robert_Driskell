import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE} from "../actions"

const initialState = {
    isLogging: false,
    isAuth: false,
    error: '',
}

export const loginReducer = (state = initialState, action) => 
{
    switch(action.type) {
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
                isAuth: true,
                error: '',
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLogging: false,
                isAuth: false,
                error: action.payload,
            }
        default:
            return state;
    }
};

