import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const SERVER_BASE_URL = "https://droom-bw.herokuapp.com";

//AUTHENTICATION
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
            localStorage.setItem('userID', res.data.id);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
        });
};

export const register = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    let cr = { username: creds.username, password: creds.password, user_type: -1 };
    return axios
        .post(`${SERVER_BASE_URL}/auth/register`, cr)
        .then(res => {
            localStorage.setItem('userToken', res.data.token);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            console.log(res.data);
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
        })
};

export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const getCurrentUser = () => dispatch => {
    dispatch({ type: GET_USER_START })
    axiosWithAuth(localStorage.getItem('userID'))
        .get(`${SERVER_BASE_URL}/profile/seeker`)
        .then(res => {
            console.log(res)
            dispatch({ type: GET_USER_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err);
            axiosWithAuth(localStorage.getItem('userID'))
                .get(`${SERVER_BASE_URL}/profile/employer`)
                .then(res => {
                    console.log(res)
                    dispatch({ type: GET_USER_SUCCESS, payload: res.data })
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type: GET_USER_FAILURE, payload: err.response.message })
                })
        })
}

 export const updateInfo = (data,cb) => dispatch => 
  {
    dispatch({ type: "start-update" });
    return axiosWithAuth(4)
    .pull(`${SERVER_BASE_URL}/profile/seeker`, {first_name: "chase", last_name: "wenner"})
    .then(res =>
      {
        console.log(res.data);
        //cb();
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
      });
  }

