const mongoose = require('mongoose')

// Define Schema
const Schema = mongoose.Schema
const VotingSessionSchema = new Schema({
    name: String,
    creator: String,
    creationDate: Date,
    voters: [Object],
    movieOptions: [Object],
    movieVotes: Object,

})

module.exports = mongoose.model('VotingSession', VotingSessionSchema)