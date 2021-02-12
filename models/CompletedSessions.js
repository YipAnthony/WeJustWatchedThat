const mongoose = require('mongoose')

// Define Schema
const Schema = mongoose.Schema
const CompletedSessionSchema = new Schema({
    name: String, //User input session name (default Firstname's Session)
    creator: String, //creator id
    password: String, //autogenerate 4 letters 
    creationDate: Date, // default date now
    voteResults: [Object], //additional users logged into session
    movieOptions: [Object]

})

module.exports = mongoose.model('CompletedSession', CompletedSessionSchema)