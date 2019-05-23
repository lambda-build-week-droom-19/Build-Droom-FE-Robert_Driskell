import { combineReducers } from "redux";
import { loginReducer } from "./Authenticator";
import { userReducer } from "./GetUser";
import { employerJobReducer } from "./EmployerProfileJobs";

export default combineReducers({
  loginReducer,
  userReducer,
  employerJobReducer
});
