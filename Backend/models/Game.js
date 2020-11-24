const mongoose = require('mongoose')
const Schema = mongoose.Schema

//user schema
const GameSchema = new Schema({
    gameId: {required: true, type: String},
    url: String,
    status: String,
    challenger: {
        id: String,
    },
    receiver: {
        id: String,
    },
    movesList: [String],
    nextMove: String
})

const Game = mongoose.model("games", GameSchema)
module.exports = Game