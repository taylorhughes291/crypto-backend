const mongoose = require('mongoose')
const Schema = mongoose.Schema

//User schema
const userSchema = new Schema ({
	password: String,
    username: String,
}, {timestamps: true})

//Publish the model
const User = mongoose.model('User', userSchema)

//export the model
module.exports = User