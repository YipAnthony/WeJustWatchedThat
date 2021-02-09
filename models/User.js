const mongoose = require('mongoose')

// Define Schema
const Schema = mongoose.Schema
const UserSchema = new Schema({
    firstName: String,
    facebook_id: String, 
    lastName: String,
    email: String,
    history: [Object],
    watchList: [Object]

})

module.exports = mongoose.model('User', UserSchema)