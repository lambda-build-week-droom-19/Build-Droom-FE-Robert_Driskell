import { GET_JOB_START, GET_JOB_SUCCESS, GET_JOB_FAILURE, GET_JOBS_SUCCESS, GET_JOBS_FAILURE, SET_JOB_FAILURE, SET_JOB_SUCCESS } from "../actions"

const initialState = {
    gettingJob: true,
    currentJob: {},
    jobs: [],
    error: '',
}

export const getJob = (state = initialState, action) => {
    switch(action.type) {
        case GET_JOB_START:
            return {
                ...state,
                gettingJob: true,
                currentJob: {},
                error: '',
            }
        case GET_JOBS_SUCCESS:
            let jobs = [...state.jobs, ...action.payload]
            return{
                ...state,
                gettingJob: false,
                jobs: jobs,
                error: '',
            }
        case GET_JOB_SUCCESS:
        case SET_JOB_SUCCESS:
            return {
                ...state,
                gettingJob: false,
                currentJob: action.payload,
                error: '',
            }
        case GET_JOBS_FAILURE:
        case GET_JOB_FAILURE:
        case SET_JOB_FAILURE:
            return {
                ...state,
                gettingJob: false,
                currentJob: {},
                error: action.payload,
            }        
        default:
            return state;
    }
}