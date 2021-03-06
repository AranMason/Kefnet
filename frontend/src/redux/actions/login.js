import axios from 'axios';

export const LOGIN = 'LOGIN';
const successfulLoginUser = payload => {
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

export function signUpUser(username, email, password) {

    return function(dispatch){
        dispatch(awaitingUserChange());

        return axios.post('/login/signup', {
            username, email, password
        }).then(res => {

            dispatch(successfulLoginUser(res.data));

        })
    }
}

export function loginUser(username, password) {

    return function(dispatch){
        dispatch(awaitingUserChange())

        return axios.post(`/login`, {
            username,
            password
        }).then(res => {

            dispatch(successfulLoginUser(res.data))

        })
    }
}

export function logOutUser() {

    return function (dispatch) {
        dispatch(awaitingUserChange());

        return axios.post(`/logout`).then(res => {
            dispatch(completelogOutUser())
        })
    }
}

export function getLoginStatus() {

    

    return function(dispatch) {

        dispatch(awaitingUserChange())

        return axios.get('/login/status', {
            withCredentials: true
        }).then(res => {
            dispatch(successfulLoginUser(res.data))
          }).catch(err => {
              dispatch(completelogOutUser())
          });

    }
}