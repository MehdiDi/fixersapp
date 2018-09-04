import {GET_ANNONCES, GET_ANNONCE, DELETE_ANNONCE, ADD_ANNONCE, REQUEST_ANNONCE, ERROR_ANNONCE, RESET_ANNONCE,
    LIKE_ANNONCE
} from '../actions/annonceActions';

const initialState = {
    loading: false,
    annonces: [],
    annonce: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case REQUEST_ANNONCE:
            return Object.assign({}, state, {
                loading: true
            });
        case GET_ANNONCES:
            return Object.assign({}, state, {
                loading: false,
                annonces: action.payload
            });
            
        case DELETE_ANNONCE:
            return Object.assign({}, state, {
                loading: false,
            });
            
        case ADD_ANNONCE:
        
            return Object.assign({}, state, {
                loading: false,
                added: true
            });

        case ERROR_ANNONCE:
            return Object.assign({}, state, {
                loading: false,
                errorMessage: action.payload
            });
        case RESET_ANNONCE:
            return state = {
                loading: false,
                annonces: [],
                annonce: {},
                added: false
            }
        case GET_ANNONCE: 
            return Object.assign({}, state, {
                loading: false,
                annonces: [],
                annonce: action.payload 
            });
        case LIKE_ANNONCE:
            
            return Object.assign({}, state, {
                annonce: action.payload
            });
        default: return state;
        
    }
}