import axios from "axios";

export const LOGIN_START = "LOGIN_START"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return axios
      .post('/api/login', creds)
      .then(res => {
        localStorage.setItem('userToken', res.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
      });
  };

  export const createAuthorization = () => {
    const token = localStorage.getItem('userToken');

    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    });
};