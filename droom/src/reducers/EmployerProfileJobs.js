import {
    GET_EMPLOYER_JOBS_START,
    GET_EMPLOYER_JOBS_SUCCESS,
    GET_EMPLOYER_JOBS_FAILURE
} from "../actions"

const initialState = {
    gettingJobs: false,
    jobs: [],
    error: '',
}

export const employerJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYER_JOBS_START:
            return {
                gettingJobs: true,
                jobs: [],
                error: '',
            }
        case GET_EMPLOYER_JOBS_SUCCESS:
            return {
                gettingJobs: false,
                jobs: action.payload,
                error: '',
            }
        case GET_EMPLOYER_JOBS_FAILURE:
            return {
                gettingJobs: false,
                jobs: [],
                error: action.payload,
            }
        default:
            return state;
    }
}