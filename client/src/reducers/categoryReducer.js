import {GET_CATEGORIES} from '../actions/categoryActions';

const initialState = {
    categories: []
};

export default function (state = initialState, action){
    switch(action.type){
        case GET_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.payload
            });
        default: return state;
    }
}