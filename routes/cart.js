const express = require('express')
const Cart = require('../model/cart')
const Product = require('../model/product_schema')
const router = express.Router()


router.get('/',(req,res,next) => {
    if(!req.session.cart) {
        return res.render('cart',{products: null}) 
    }
    var cart = new Cart(req.session.cart)
    console.log(cart.generatedArray())
    res.render('cart',{products: cart.generatedArray(), totalPrice: cart.totalPrice})
})

router.get('/:id',(req,res,next) => {
    let productId = req.params.id
    let cart =  new Cart(req.session.cart ? req.session.cart : {})
    Product.findById(productId, (err,product) => {
        if(err) {
            return res.redirect('/')
        }
        cart.add(product, product._id)
        req.session.cart = cart
        console.log(req.session.cart)
        res.redirect('/allproduct')
    })
})


module.exports = router