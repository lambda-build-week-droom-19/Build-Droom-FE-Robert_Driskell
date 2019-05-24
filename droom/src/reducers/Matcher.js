import {GET_MATCHES_START, GET_MATCHES_SUCCESS, GET_MATCHES_FAILURE, ACCEPT_MATCH, REJECT_MATCH, JOB_ACCEPT_MATCH, JOB_REJECT_MATCH} from "../actions"


const initialState = {
    gettingMatch: false,
    currentMatches: [],
    dontFetch: false,
    error: '',
}

export const matcher = (state = initialState, action) => {
    let arry;
    let index = -1;
    let indx2 = -1;
    switch (action.type) {
        case GET_MATCHES_START:
            return {
                ...state,
                gettingMatch: true,
                error: '',
            }

        case GET_MATCHES_SUCCESS:
            return {
                ...state,
                gettingMatch: false,
                dontFetch: !action.payload.length,
                currentMatches: [...state.currentMatches,...action.payload],
                error: '',
            }

        case  GET_MATCHES_FAILURE:
            return {
                ...state,
                gettingMatch: false,
                dontFetch: true,
                error: action.payload,
            }
        case JOB_ACCEPT_MATCH:
            arry = state.currentMatches;
            index = -1;
            arry.forEach((x,i)=> { if(x.job.id === action.payload.jobid) index = i;})
            if(index > -1) 
            {
                indx2 = -1;
                arry[index].usersAvailable.forEach((x,i)=> { if(x=== action.payload.user.user_id) indx2=i; })
                if(index > -1)
                {
                    arry[index].usersAvailable.splice(indx2, 1);
                }
                if(!arry[index].usersConfirmed.includes(action.payload.user)) arry[index].usersConfirmed.push(action.payload.user);
            }
            return{
                ...state,
                currentMatches: [...arry]
            }
        case JOB_REJECT_MATCH:
             arry = state.currentMatches;
            index = -1;
            arry.forEach((x,i)=> { if(x.job.id === action.payload.jobid) index = i;})
            if(index > -1) 
            {
                indx2 = -1;
                arry[index].usersAvailable.forEach((x,i)=> { if(x=== action.payload.user.user_id) indx2=i; })
                if(index > -1)
                {
                    arry[index].usersAvailable.splice(indx2, 1);
                }
            }
            return{
                ...state,
                currentMatches: [...arry]
            }

        case ACCEPT_MATCH:
        case REJECT_MATCH:
            arry = state.currentMatches;
            arry.shift();
            return {
                ...state,
                currentMatches: [...arry]
            }
        default:
            return state;
    }
}