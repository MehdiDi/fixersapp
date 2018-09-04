const mongoose = require('mongoose');
const catSchema = new mongoose.Schema({
    catName: {type: String, require: true},
    img: {type: String}
});
module.exports = mongoose.model('Category', catSchema);