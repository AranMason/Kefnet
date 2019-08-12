import { LOGIN, LOG_OUT, AWAITING_USER_CHANGE } from '../actions/login';

const initialState = {
    isLoggedIn: false,
    awaitingLogin: false
}

export default function(state=initialState, action){
    switch(action.type){
        case LOGIN: {
            return {
                ...state,
                isLoggedIn: action.payload.success,
                awaitingLogin: false,
                user: action.payload.success ? action.payload.user : null
            }
        }
        case AWAITING_USER_CHANGE: {
            return {
                ...state,
                isLoggedIn: false,
                awaitingLogin: true,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                awaitingLogin: false,
                user: {}
            }
        }
        default:
            return state
    }
}