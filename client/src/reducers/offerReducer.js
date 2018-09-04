import { REQUEST_OFFER, ADD_OFFER, GET_OFFERS, ERR_OFFER, NOTIFY_OFFER } from '../actions/offerActions'

const initialState = {
    loading: false,
    offers: [],

    errMessage: ''
}
export default function(state = initialState, action) {
    switch(action.type){

        case REQUEST_OFFER: 
            return Object.assign({}, state, {
                loading: true
            });

        case GET_OFFERS:
        
            return Object.assign({}, state, {
                loading: false,
                offers: action.payload,
                errMessage: ""
            });

        case ADD_OFFER:
            return Object.assign({}, state, {
                loading: false,
                offers:[ ...state.offers, action.payload ]
            });
        


        default: return state;
    }
}