const express = require('express')
const router = express.Router()
const Cart = require('../model/cart')

router.get('/',(req,res) => {
    if(!req.session.cart) {
        return res.render('cart',{products: null}) 
    }
    var cart = new Cart(req.session.cart)
    console.log(cart.generatedArray())
    res.render('checkout',{products: cart.generatedArray(), totalPrice: cart.totalPrice})
})

router.post('/',(req,res) => {

})

module.exports = router