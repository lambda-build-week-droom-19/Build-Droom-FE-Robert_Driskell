import { GET_USER_START, GET_USER_SUCCESS, GET_USER_FAILURE } from "../actions"

const initialState = {
    gettingUser: false,
    currentUser: {},
    error: '',
}

export const getUser = (state = initialState, action) => {
    switch(action.type) {
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
        default:
            return state;
    }
}