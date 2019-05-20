import axios from "axios";

export const SERVER_BASE_URL = "https://droom-bw.herokuapp.com"
export const LOGIN_START = "LOGIN_START"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return axios
      .post(`${SERVER_BASE_URL}/auth/login`, creds)
      .then(res => {
        localStorage.setItem('userToken', res.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
      });
  };

export function addHeaders (id){
    const token = JSON.parse(localStorage.getItem('userToken'));

    return axios.create({
        headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
             id: id
        }
    })
}