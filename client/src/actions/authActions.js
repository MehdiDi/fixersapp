import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const NOTIFS_RECEIVED = "NOTIFS_RECEIVED";
export const LOG_OUT = "LOG_OUT";




function requestLogin(creds){
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        creds
    }
}

function loginError(message){
    return {
        type: LOGIN_FAILED,
        isFetching: false,
        message
    };
}

function receiveLogin(user){
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        user

    }
}
function receiveLogout(){
    return {
        type: LOG_OUT
    }
}
function notificationsReceived(notifs){
    return {
        type: NOTIFS_RECEIVED,
        payload: notifs
    }
}

export function loginUser(creds){
    return dispatch => {
        dispatch(requestLogin(creds));
    axios
        .post('/api/users/login', creds)
        .then(resp => {
            
            const {token} = resp.data; 
            localStorage.setItem('jwtToken', token);
            const user = jwt_decode(token);
            
            dispatch(receiveLogin(user));
            
        }).catch(err => {
            const status = err.response.status;
            let msg;
            if(status === 500)
                msg = err.message;
            if(status === 404)
                msg = "Cet email n'existe pas.";
            else if(status === 401)
                msg = "Mot de passe incorrecte.";

            dispatch(loginError(msg));
        });
    }
}
export function registerUser(creds){
    return dispatch => {
        axios.post('/api/users/register', creds)
            .then(res => {
                
            })
            .catch(err => dispatch(loginError(err)));

    }
}
export function logoutUser(){
    return dispatch => {
        localStorage.removeItem("jwtToken");
        dispatch(receiveLogout());

    }
}

export function getNotifications(userId){
    return dispatch => {
        axios.get('/api/users/' + userId + '/notifications')
            .then(res => {
                dispatch(notificationsReceived(res.data));

            })
            .catch(err => console.log(err));
    }
}