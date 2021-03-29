const mongoose = require('mongoose')
const Schema = mongoose.Schema


const product_schema = new Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    }
})

const Product = mongoose.model("Product",product_schema)
module.exports = Product

