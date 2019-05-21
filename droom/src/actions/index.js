import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const SERVER_BASE_URL = "https://droom-bw.herokuapp.com";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return axios
        .post(`${SERVER_BASE_URL}/auth/login`, creds)
        .then(res => {
            console.log(res);
            localStorage.setItem("userToken", res.data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
        });
};

export const register = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    let cr = {username: creds.username, password: creds.password, user_type: -1};
    return axios
      .post(`${SERVER_BASE_URL}/auth/register`, cr)
      .then(res => {
        localStorage.setItem('userToken', res.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        console.log(res.data);
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
      });
  };
export function updateInfo()
{
    return {type: "none"}
}
