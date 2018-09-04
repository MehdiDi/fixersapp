const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    nom: { type: String, required: true, unique: true},
    prenom: { type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: String,
    notifications: [{
        message: String,
        lien: String,
        seen: Boolean
    }],
    socketId: String
});

module.exports = mongoose.model('User', userSchema);