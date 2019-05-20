import {LOGIN_SUCCESS, LOGIN_FAILURE} from "../actions"
import {fakeAuth} from "../utils/axiosWithAuth"

export const addTokenToLocalStorage = store => next => action => 
{
    if(action.type === LOGIN_SUCCESS) {
        localStorage.setItem('userToken', action.payload.token);
        fakeAuth.isAuthenticated = true;
    }
    if(action.type === LOGIN_FAILURE) console.log(action.payload);
    next(action);
};

