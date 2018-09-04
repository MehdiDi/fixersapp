import {LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, NOTIFS_RECEIVED, LOG_OUT} from '../actions/authActions';
import jwt_decode from 'jwt-decode';


const getUserData = () => {
    const token = localStorage.getItem('jwtToken');

    if(!token){
        
        return null;
    } 
        
    const user = jwt_decode(token);
    
    return user;
}

const initialState = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('jwtToken') ? true : false,
    notifications: null,
    user: getUserData()
}

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_REQUEST: 
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                errorMessage: ''
            });
        case LOGIN_SUCCESS:
        
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                user: action.user,
                errorMessage: ''
            });
        case LOGIN_FAILED:
            
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });
            case NOTIFS_RECEIVED:

                return Object.assign({}, state, {
                    notifications: action.payload.notifications
                });
        case LOG_OUT: 
            return Object.assign({}, state, {
                isAuthenticated: false,
                user: null
            });
    default: return state
    }
}

