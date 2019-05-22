import { combineReducers } from 'redux';
import { loginReducer } from "./Authenticator";
import { getUser } from "./GetUser";
import { getJob } from "./GetJob";

export default combineReducers({
    loginReducer,
    getUser,
    getJob
});