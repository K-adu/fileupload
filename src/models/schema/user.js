 const mongoose = require('mongoose')
const joi = require('joi')
 const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
 })

const User = mongoose.model('User', userSchema)

module.exports = User