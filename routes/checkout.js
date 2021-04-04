const { render } = require('ejs')
const express = require('express')
const Bill = require('../model/bill')
const router = express.Router()
const Cart = require('../model/cart')

router.get('/',(req,res) => {
    if(!req.session.cart) {
        return res.render('checkout',{products: null}) 
    }
    var cart = new Cart(req.session.cart)
    console.log(cart.generatedArray())
    res.render('checkout',{products: cart.generatedArray(), totalPrice: cart.totalPrice})
})

router.post('/',async(req,res) => {
    try{
        var cart = new Cart(req.session.cart)
        const bill = new Bill({
            name: req.body.name,
            phonenumber: req.body.phonenumber,
            email: req.body.email,
            address: req.body.address,
            additional: req.body.additional,
            paymentMethod: req.body.paymentMethod,
            card_name: req.body.card_name,
            card_number: req.body.card_number,
            bill_info: cart.generatedArray(),
            totalPrice: cart.totalPrice
        })
        let newbill = await bill.save()
        delete req.session.cart
        setTimeout(() => {
            res.redirect('/')
        }, 5000);
    } catch(err) {
        console.log(err)
    }
})

module.exports = router