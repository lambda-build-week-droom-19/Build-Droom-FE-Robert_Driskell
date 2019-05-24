import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const SERVER_BASE_URL = "https://droom-bw.herokuapp.com";

//AUTHENTICATION
export const LOGIN_START = "LOGIN_START";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const login = (creds, cb = ()=>{}) => dispatch => {
    dispatch({ type: LOGIN_START });
    return axios
        .post(`${SERVER_BASE_URL}/auth/login`, creds)
        .then(res => {
            localStorage.setItem("userToken", res.data.token);
            localStorage.setItem('userID', res.data.id);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            window.setTimeout(cb, 250);
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err });
            //cb();
        });
};

export const register = (creds,cb) => dispatch => {
    dispatch({ type: GET_USER_START });
    let cr = { username: creds.username, password: creds.password, user_type: creds.user_type };
    let name = creds.user_type === 1 ? "seeker" : "employer";
    return axios
        .post(`${SERVER_BASE_URL}/auth/register`, cr)
        .then(res => {
            localStorage.setItem('userToken', res.data.token);
            console.log(res.data);
            localStorage.setItem('userType', res.user_type );
            localStorage.setItem('userID', res.data.id);
            axiosWithAuth()
            .post(`${SERVER_BASE_URL}/profile/${name}`,  {user_id : res.data.id})
            .then(res2=> {
                localStorage.setItem("userID", res2.data.user_id);
                dispatch({ type: LOGIN_SUCCESS, payload: res.data });
                cb();
            }).catch(err => {
                dispatch({ type: LOGIN_FAILURE, payload: err });
            })
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAILURE, payload: err });
        })
};

export const createProfile = (data,type,cb) => dispatch =>
{
    let name = type === 1 ? "seeker" : "employer";
    dispatch({ type: "START" });
    console.log(data);
    axiosWithAuth().put(`${SERVER_BASE_URL}/profile/${name}`,  data)
    .then(res=> {
        dispatch({ type: "PASSED", payload: res.data });
        localStorage.setItem("userID", res.data.user_id);
        window.setTimeout(cb, 250);
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
            localStorage.setItem('userType', 'seeker')
            dispatch({ type: GET_USER_SUCCESS, payload: res.data })
        })
        .catch(err => {
            console.log(err);
            axiosWithAuth(localStorage.getItem('userID'))
                .get(`${SERVER_BASE_URL}/profile/employer`)
                .then(res => {
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

//GET JOBS FROM A SPECIFIC EMPLOYER
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
export const SET_JOB_START = "SET_JOB_START"
export const SET_JOB_SUCCESS = "SET_JOB_SUCCESS"
export const SET_JOB_FAILURE = "SET_JOB_FAILURE"

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

export const changeJob = (data,id) => dispatch =>
{
    return axiosWithAuth()
    .put(`${SERVER_BASE_URL}/jobs/${id}`, data)
    .then(res =>
         {
            console.log(res.data);
            dispatch({ type: SET_JOB_SUCCESS, payload: res.data })
        })
    .catch(err => {console.log(err); dispatch({ type: SET_JOB_FAILURE });});

}


export const GET_MATCHES_START = "GET_MATCHES_START";
export const GET_MATCHES_SUCCESS = "GET_MATCHES_SUCCESS";
export const GET_MATCHES_FAILURE = "GET_MATCHES_FAILURE";
export const ACCEPT_MATCH = "ACCEPT_MATCH";
export const REJECT_MATCH = "REJECT_MATCH";
export const JOB_ACCEPT_MATCH = "JOB_ACCEPT_MATCH";
export const JOB_REJECT_MATCH = "JOB_REJECT_MATCH";

export const getMatches = (type) => dispatch =>
{
    dispatch({type: GET_MATCHES_START});
    let name = type === 0 ?"jobs/matches/seeker": "jobs/matches/employer"
    axiosWithAuth()
    .get(`${SERVER_BASE_URL}/${name}/`)
    .then(res =>
        {
            console.log(res.data);
            dispatch({type: GET_MATCHES_SUCCESS, payload: res.data});
        })
    .catch(err => {console.log(err); dispatch({ type: GET_MATCHES_FAILURE });});
}

export const swipeMatch = (swipe,reciever,user,type) => dispatch =>
{
    
    if(type === "seeker"){
        dispatch({type: swipe===1 ? ACCEPT_MATCH : REJECT_MATCH});
        if(!user || !user.seen || user.seen.includes(parseInt(reciever.id))) {console.log("this user does not exist or is already been seen"); return;}
        user.seen.push(parseInt(reciever.id));
        axiosWithAuth()
        .put(`${SERVER_BASE_URL}/profile/seeker`, user)
        .then(() => {

            if(swipe === 1)
            return axios
            .get(`${SERVER_BASE_URL}/jobs/${reciever.id}`)
            .then(res => 
                {
                    
                    let job = res.data;
                    let user_id = parseInt(localStorage.getItem("userID"));
                    if(!job || !job.appliers ||job.appliers.includes(user_id)) {console.log("this user does not exist or is already been seen"); return;}
                    job.appliers.push(user_id);
                    axiosWithAuth()
                    .put(`${SERVER_BASE_URL}/jobs/${reciever.id}`, job)
                    .then (() => console.log("done"))
                    .catch(() => console.log("insdie err"));
                })
                .catch(()=>console.log('outside error'));
                else console.log("rejected");
        })
        .catch(() => {/* console.log("rejected") */});
        /* Add to job avalitble list */
       
       
    }else 
    {
        dispatch({type: swipe===1 ? JOB_ACCEPT_MATCH : JOB_REJECT_MATCH,  payload: {jobid: reciever.job.id, user: user}});
            return axiosWithAuth()
        .get(`${SERVER_BASE_URL}/jobs/${reciever.job.id}`)
        .then((res) => {
            console.log(user.user_id)
            let job = res.data;
            if(swipe === 1){
            if(!job || !job.confirmed || job.confirmed.includes(user.user_id)) {console.log("this user does not exist or is already been seen");}
            else job.confirmed.push(user.user_id)
            //job.confirmed = [5,4];
            }
            if(!job || !job.appliers) {console.log("this user does not exist or is already been seen"); return;}
            job.appliers = job.appliers.filter(x => user.user_id !== x);
            //job.appliers = [1,2,3,4,5,6,7,8,9,10];
            return axiosWithAuth()
            .put(`${SERVER_BASE_URL}/jobs/${reciever.job.id}`, job)
            .then((res)=>console.log(res.data))
            .catch(() => {console.log("Change rejected")})
        })
        .catch(() => {console.log("rejected")});
    }
}