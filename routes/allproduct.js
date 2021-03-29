const express = require('express')
const User = require('../model/user_schema')
const router = express.Router()
const Product = require('../model/product_schema')

router.get('/',(req,res) => {
    res.render('allproduct',{products: new Product})
})

router.post('/',(req,res) => {
    User.find({name: input_product},(err, product) => {
        res.redirect('/allproduct', {products: product})
    })
})

module.exports = router