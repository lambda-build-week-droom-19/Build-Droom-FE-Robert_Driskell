import { combineReducers } from 'redux';
import { loginReducer } from "./Authenticator";
import { getUser } from "./GetUser";

export default combineReducers({
    loginReducer,
    getUser
});