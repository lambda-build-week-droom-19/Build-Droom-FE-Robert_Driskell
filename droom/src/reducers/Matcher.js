import {GET_MATCHES_START, GET_MATCHES_SUCCESS, GET_MATCHES_FAILURE, ACCEPT_MATCH, REJECT_MATCH} from "../actions"


const initialState = {
    gettingMatch: false,
    currentMatches: [],
    error: '',
}

export const matcher = (state = initialState, action) => {
    switch (action.type) {
        case GET_MATCHES_START:
            return {
                ...state,
                gettingMatch: true,
                error: '',
            }

        case GET_MATCHES_SUCCESS:
            return {
                ...state,
                gettingMatch: false,
                currentMatches: [...state.currentMatches,...action.payload],
                error: '',
            }

        case  GET_MATCHES_FAILURE:
            return {
                ...state,
                gettingMatch: false,
                error: action.payload,
            }

        case ACCEPT_MATCH:
        case REJECT_MATCH:
            let arry = state.currentMatches;
            arry.shift();
            return {
                ...state,
                currentMatches: [...arry]
            }
        default:
            return state;
    }
}