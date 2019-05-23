import { combineReducers } from 'redux';
import { loginReducer } from "./Authenticator";
import { userReducer } from "./GetUser";
import { getJob } from "./GetJob";
import { getUser} from "./GetUser"
import {matcher} from "./Matcher"

export default combineReducers({
    loginReducer,
    userReducer,
    getJob,
    matcher
});