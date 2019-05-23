import { combineReducers } from 'redux';
import { loginReducer } from "./Authenticator";
import { userReducer } from "./GetUser";

export default combineReducers({
    loginReducer,
    userReducer
});