const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    email: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_on:{
        type:Date,
        default:Date.now
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId, ref:'Product'
    }
})

const User = mongoose.model('User',user_schema)
module.exports = User