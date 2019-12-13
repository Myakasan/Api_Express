const mongoose = require('mongoose');

const schema  = mongoose.Schema({
    url : String,
})

 
module.exports = mongoose.model('site', schema);