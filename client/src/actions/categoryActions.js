import axios from 'axios';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ERR_CATEGORIES = 'ERR_CATEGORIES';

function catsReceived(cats){
    return {
        type: GET_CATEGORIES,
        payload: cats
    }
}

function errReceived(msg){
    return {
        type: ERR_CATEGORIES,
        errMessage: msg
    }
}

export function getCategories(){
    return dispatch => {
        axios.get('/api/categories')
            .then(res => {
                dispatch(catsReceived(res.data));
            })
            .catch(err => dispatch(errReceived(err)));
    }
    
}