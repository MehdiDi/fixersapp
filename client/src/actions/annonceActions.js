import axios from 'axios';

export const REQUEST_ANNONCE = "REQUEST_ANNONCE";
export const GET_ANNONCES = "GET_ANNONCES";
export const DELETE_ANNONCE = "DELETE_ANNONCE";
export const ADD_ANNONCE = 'ADD_ANNONCE';
export const ERROR_ANNONCE = "ERROR_ANNONCE";
export const RESET_ANNONCE = "RESET_ANNONCE";
export const GET_ANNONCE = "GET_ANNONCE";
export const LIKE_ANNONCE = "LIKE_ANNONCE";
export const UNLIKE_ANNONCE = "UNLIKE_ANNONCE";


function annonceRequested(){
    return {
        type: REQUEST_ANNONCE,
        loading: true,
        payload: null
    }
}

function annonceCreated(){
    return {
        type: ADD_ANNONCE
    }
}

function annoncesReceived(annonces){
    return {
        type: GET_ANNONCES,
        loading: false,
        payload: annonces
    }
}
function errorReceived(error){
    return {
        type: ERROR_ANNONCE,
        loading: false,
        payload: error
    }
}
function annonceReceived(annonce){
    return {
        type: GET_ANNONCE,
        loading: false,
        payload: annonce
    }
}

function resetAnnonce(){
    return {
        type: RESET_ANNONCE
    }
}

function annonceLiked(annonce){
    return {
        type: LIKE_ANNONCE,
        payload: annonce
    }
}


export function resetState(){
    return dispatch => {
        dispatch(resetAnnonce());
    }
}



export function ajouterAnnonce(data){
    return dispatch => {
        dispatch(annonceRequested());
        const token = localStorage.getItem('jwtToken');
        const options = {
            headers:{
                authorization: 'Bearer ' + token,
                'Content-type': 'enctype/form-data'
            }
        }
        axios.post('/api/annonces', data, options)
            .then(res => {
                dispatch(annonceCreated())
            })
            .catch(err => dispatch(errorReceived(err)));
    }
}

export function getAnnonces(cat) {
    
    return dispatch => {
        dispatch(annonceRequested());
            
        axios.get('/api/annonces/'+(cat ? cat : ''))
        .then(res => {
            
            dispatch(annoncesReceived(res.data.annonces));
        })
        .catch(err => dispatch(errorReceived(err)));
    }
}

export function showAnnonce(id){
    return dispatch => {
        dispatch(annonceRequested());
        axios.get('/api/annonces/show/'+id)
             .then(res => dispatch(annonceReceived(res.data)))
             .catch(err => dispatch(errorReceived(err)));
    }
}

export function likeAnnonce(id, user) {
    return dispatch => {
        
        axios.post('/api/annonces/like/' + id, {id: user})

            .then(res => dispatch(annonceLiked(res.data.annonce)))
            .catch(err => dispatch(errorReceived(err)));
    }
}
export function unlikeAnnonce(id, user) {
    return dispatch => {
        
        axios.post('/api/annonces/unlike/' + id, {id: user})
            .then(res => dispatch(annonceLiked(res.data.annonce)))
            .catch(err => dispatch(errorReceived(err)));
    }
}
