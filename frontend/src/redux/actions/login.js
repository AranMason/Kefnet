// import { LOGIN, SIGN_UP, LOG_OUT } from '../actionTypes';

import axios from 'axios';

export const LOGIN = 'LOGIN';
const succcessfulLoginUser = payload => {
    console.log("Successful")
    return {
        type: LOGIN,
        payload
    }
}

export const LOG_OUT = 'LOG_OUT'
const completelogOutUser = payload => ({
    type: LOG_OUT,
    payload
})

// Waiting for the server to return a successful login or not.
export const AWAITING_USER_CHANGE = 'AWAITING_USER_CHANGE';
const awaitingUserChange = payload => ({
    type: AWAITING_USER_CHANGE,
    payload
}) 

// export const failedLogin = 'SUCCESSFUL_LOGIN';


export function loginUser(username, password) {

    console.log("Attempting Login");

    return function(dispatch){
        dispatch(awaitingUserChange())

        console.log(`/login`)

        return axios.post(`/login`, {
            username,
            password
        }).then(res => {

            dispatch(succcessfulLoginUser(res.data))

        })
    }
}

export function logOutUser() {
    return function (dispatch) {
        dispatch(awaitingUserChange())

        return axios.post(`/logout`).then(res => {
            dispatch(completelogOutUser())
        })
    }
}