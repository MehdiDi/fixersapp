const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const OfferSchema = new Schema({
    message: { type: String, required: true},
    prix: {type: Number, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    annonce: { type: Schema.Types.ObjectId, ref: 'Annonce', required: true},
    date: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Offer', OfferSchema);