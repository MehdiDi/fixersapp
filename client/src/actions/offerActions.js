import axios from 'axios'

export const REQUEST_OFFER = "REQUESTED_OFFERS";
export const GET_OFFERS = "GET_OFFERS";
export const ADD_OFFER = "ADD_OFFER";
export const ERR_OFFER = "ERR_OFFER";
export const NOTIFY_OFFER = "NOTIFY_OFFER";

function offerRequested(){
    return {
        type: REQUEST_OFFER
    }
}
function offersReceieved(offers){
    return {
        type: GET_OFFERS,
        payload: offers
    }
}
function offerAdded(offer, authorId){
    return {
        type: ADD_OFFER,
        payload: offer
    }
}
function offerError(msg){
    return{
        type: ERR_OFFER,
        payload: msg
    }
}

export function getOffers(id){
    return dispatch => {
        
        dispatch(offerRequested());
        
        axios.get('/api/offers/' + id)
        .then(res => {
            
            dispatch(offersReceieved(res.data));
        })
        .catch(err => dispatch(offerError(err)));
    }
}
function notify(notif){
    return {
        type: NOTIFY_OFFER,
        payload: notif
    }
}
function sendNotification(offer, authorId){
    
    const data = {
        message: offer.user.nom + " " + offer.user.prenom + " a placé une offre",
        link: '/annonces/' + offer.annonce
    }
    axios.post('/api/users/notify/' + authorId, data)
        .then(res => {
            
        })
        .catch(err => console.log(err));
    
}


export function addOffer(offer, authorId){

    return dispatch => {

        dispatch(offerRequested());
        const token = localStorage.getItem('jwtToken');
        
        if(!token){
            dispatch(offerError("Vous devez être authentifiés pour envoyer une offre."));
            return;
        }

        const options = {
            headers:{
                authorization: 'Bearer ' + token
            } 
        }
        
        axios.post('/api/offers', {
            prix: offer.prix,
            message: offer.message,
            user: offer.user.id,
            annonce: offer.annonce

            }, options)
            .then(res => {
                sendNotification(offer, authorId);
                
                dispatch(offerAdded(res.data));
                
            })
            .catch(err => dispatch(offerError(err)));
    }
}
