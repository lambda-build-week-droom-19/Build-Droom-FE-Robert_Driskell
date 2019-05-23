import { combineReducers } from "redux";
import { loginReducer } from "./Authenticator";
import { userReducer } from "./GetUser";
import { employerJobReducer } from "./EmployerProfileJobs";
import { getJob } from "./GetJob";

export default combineReducers({
  loginReducer,
  userReducer,
  employerJobReducer,
  getJob
});