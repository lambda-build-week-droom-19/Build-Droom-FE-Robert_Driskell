import {
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
} from "../actions"

const initialState = {
    gettingUser: false,
    updatingUser: false,
    currentUser: {},
    error: '',
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_START:
            return {
                ...state,
                gettingUser: true,
                currentUser: {},
                error: '',
            }
        case GET_USER_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                gettingUser: false,
                currentUser: action.payload,
                error: '',
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                gettingUser: false,
                currentUser: {},
                error: action.payload,
            }
        case UPDATE_USER_START:
            return {
                ...state,
                updatingUser: true,
                error: '',
            }
        case UPDATE_USER_SUCCESS:
            console.log('UPDATE USER SUCCESS IS UPDATING')
            console.log(action.payload)
            return {
                ...state,
                updatingUser: false,
                error: '',
                currentUser: action.payload,
            }
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                updatingUser: false,
                error: action.payload,
            }
        default:
            return state;
    }
}