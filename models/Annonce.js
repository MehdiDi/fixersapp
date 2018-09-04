const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnonceSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    description: {
        type: String,
        required: true
    },
    images:[String],
    likes: [String],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
module.exports  = mongoose.model('Annonce', AnnonceSchema);