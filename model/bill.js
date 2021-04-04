const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bill_schema = new Schema({
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    additional:{
        type:String
    },
    paymentMethod:{
        type:String
    },
    card_name:{
        type:String,
    },
    card_number:{
        type:Number
    },
    bill_info:{
        type:Object
    },
    totalPrice:{
        type:Number
    },
    date: {
        type:Date,
        default: Date.now()
    },
    state:{
        type:String,
        default:"Chưa tiếp nhận"
    }
})

const Bill = mongoose.model("Bill",bill_schema)
module.exports = Bill