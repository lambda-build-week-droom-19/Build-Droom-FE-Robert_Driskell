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
    dispatch({ type: GET_USER_START });
    let cr = { username: creds.username, password: creds.password, user_type: creds.user_type };
    return axios
        .post(`${SERVER_BASE_URL}/auth/register`, cr)
        .then(res => {
            localStorage.setItem('userToken', res.data.token);
            console.log(res.data);
            localStorage.setItem('userID', res.data.id);
            axiosWithAuth()
            .post(`${SERVER_BASE_URL}/profile/seeker`,  {user_id : res.data.id})
            .then(res2=> {
                localStorage.setItem("userID", res2.data.user_id);
                dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            }).catch(err => {
                dispatch({ type: LOGIN_FAILURE, payload: err });
            })
            cb();
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err });
        })
};

export const createProfile = (data,cb) => dispatch =>
{
    let name = data.user_type === 0 ? "seeker" : "employer";
    let id = localStorage.getItem("userID");
    dispatch({ type: "START" });
    axiosWithAuth().put(`${SERVER_BASE_URL}/profile/${"seeker"}`,  {first_name: data.first_name, last_name: data.last_name})
    .then(res=> {
        dispatch({ type: "PASSED", payload: res.data });
        localStorage.setItem("userID", res.data.user_id);
        console.log("COMPLETED");
        cb();
    }).catch(err => dispatch({ type: "FAILED", payload: err }) );
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
            localStorage.setItem('userType', 'seeker')
            dispatch({ type: GET_USER_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err);
            axiosWithAuth(localStorage.getItem('userID'))
                .get(`${SERVER_BASE_URL}/profile/employer`)
                .then(res => {
                    console.log(res)
                    localStorage.setItem('userType', 'employer')
                    dispatch({ type: GET_USER_SUCCESS, payload: res.data })
                })
                .catch(err => {
                    console.log(err);
                    dispatch({ type: GET_USER_FAILURE, payload: err.response.message })
                })
        })
}

export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const updateCurrentUser = (updatedProfile) => dispatch => {
    dispatch({ type: UPDATE_USER_START })
    if (localStorage.getItem('userType') === 'employer') {
        axiosWithAuth()
            .put(`${SERVER_BASE_URL}/profile/employer`, updatedProfile)
            .then(res => {
                console.log(res)
                dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data })
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: GET_USER_FAILURE, payload: err.response.message })
            })
    } else {
        axiosWithAuth()
            .put(`${SERVER_BASE_URL}/profile/seeker`, updatedProfile)
            .then(res => {
                console.log(res)
                dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data })
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: GET_USER_FAILURE, payload: err.response.message })
            })
    }
}

export const GET_EMPLOYER_JOBS_START = "GET_EMPLOYER_JOBS_START"
export const GET_EMPLOYER_JOBS_SUCCESS = "GET_EMPLOYER_JOBS_SUCCESS"
export const GET_EMPLOYER_JOBS_FAILURE = "GET_EMPLOYER_JOBS_FAILURE"

export const getEmployerJobs = (id) => dispatch => {
    dispatch({ type: GET_EMPLOYER_JOBS_START })
    return axios
        .get(`${SERVER_BASE_URL}/jobs/employer/${id}`)
        .then(res => {
            console.log(res)
            dispatch({ type: GET_EMPLOYER_JOBS_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: GET_EMPLOYER_JOBS_FAILURE, payload: err.response.message })
        })
}

export const updateInfo = (data, cb) => dispatch => {
    dispatch({ type: "start-update" });
    let id = localStorage.getItem('userID');
    console.log(id);
    return axiosWithAuth()
    .post(`${SERVER_BASE_URL}/profile/seeker`, {})
    .then(res =>
      {
          console.log(res.data);
        cb();
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
        cb();
      });
  }
  export const NICHES_SUCCESS = "NICHES_SUCCESS";

  export const getNiches = (cb = ()=>{}, failcb = ()=>{}) => dispatch =>
  {
    dispatch({ type: "start-get-niches" });
    return axios
    .get(`${SERVER_BASE_URL}/niches`)
    .then(res =>
    {
        dispatch({ type: NICHES_SUCCESS, payload: res.data })
        cb();
    })
    .catch(err => {console.log(err); failcb()})
  }

export const GET_JOB_START = "GET_JOB_START";
export const GET_JOB_SUCCESS = "GET_JOB_SUCCESS";
export const GET_JOB_FAILURE = "GET_JOB_FAILURE";
export const GET_JOBS_SUCCESS = "GET_JOBS_SUCCESS";
export const GET_JOBS_FAILURE = "GET_JOBS_FAILURE";

export const getJob = (id) => dispatch => 
{
    dispatch({ type: GET_JOB_START });
    let url = id >= 0 ? `${SERVER_BASE_URL}/jobs/${id}` : `${SERVER_BASE_URL}/jobs`
    return axios
    .get(url)
    .then(res =>
    {
        dispatch({ type: id>=0 ? GET_JOB_SUCCESS :  GET_JOBS_SUCCESS , payload: res.data })
    })
    .catch(err => {console.log(err); dispatch({ type: id >= 0 ? GET_JOB_FAILURE :  GET_JOBS_FAILURE });});
}