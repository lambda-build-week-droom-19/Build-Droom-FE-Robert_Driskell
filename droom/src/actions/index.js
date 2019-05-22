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

export const register = (creds,cb) => dispatch => {
    dispatch({ type: LOGIN_START });
    let cr = { username: creds.username, password: creds.password, user_type: 1 };
    return axios
        .post(`${SERVER_BASE_URL}/auth/register`, cr)
        .then(res => {
            localStorage.setItem('userToken', res.data.token);
            console.log(res.data);
            localStorage.setItem('userID', res.data.id);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            cb();
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
        })
};

export const createProfile = (data,cb) => dispatch =>
{
    let name = data.user_type === 0 ? "seeker" : "employer";
    axiosWithAuth().post(`${SERVER_BASE_URL}/profile/${name}`,  {...data})
    .then(res=> {
        localStorage.setItem("userID", res.data.user_id);
        cb();
    }).catch(err => console.log(err));
}

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
    let id = localStorage.getItem('userID');
    console.log(id);
    return axiosWithAuth()
    .post(`${SERVER_BASE_URL}/profile/seeker`, data)
    .then(res =>
      {
        cb();
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
        cb();
      });
  }
  export const NICHES_SUCCESS = "NICHES_SUCCESS";

  export const getNiches = (cb, failcb) => dispatch =>
  {
    dispatch({ type: "start-get-niches" });
    axios
    .get(`${SERVER_BASE_URL}/niches`)
    .then(res =>
    {
        dispatch({ type: NICHES_SUCCESS, payload: res.data })
        cb();
    })
    .catch(err => {console.log(err); failcb()})
  }
