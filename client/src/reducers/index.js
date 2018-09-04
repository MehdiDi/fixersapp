import { combineReducers } from 'redux'
import authReducer from './authReducer'
import annonceReducer from './annonceReducer'
import categoryReducer from './categoryReducer'
import offerReducer from './offerReducer'

export default combineReducers({
    auth: authReducer,
    annonce: annonceReducer,
    category: categoryReducer,
    offer: offerReducer
}); 