const mongoose = require('mongoose')
const Schema = mongoose.Schema

//user schema
const UserSchema = new Schema({
    name: {required: true, type: String},
    email: {required: true, type:String},
    password:  {required: true, type:String},
})

const User = mongoose.model("users", UserSchema)
module.exports = User