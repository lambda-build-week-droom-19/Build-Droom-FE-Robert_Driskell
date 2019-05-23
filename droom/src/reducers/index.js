import { combineReducers } from 'redux';
import { loginReducer } from "./Authenticator";
import { userReducer } from "./GetUser";
import { getJob } from "./GetJob";

export default combineReducers({
    loginReducer,
    userReducer,
    getUser,
    getJob
});