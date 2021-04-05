const express = require('express')
const { Mongoose } = require('mongoose')
const router = express.Router()
const Product = require('../model/product_schema')

router.get('/',async (req,res) => {
    let searchoption = {}
    if(req.query.input_product != null && req.query.input_product !== ""){
        searchoption.name = new RegExp(req.query.input_product,'i')
    }
    try{
        const product = await Product.find(searchoption)
        res.render('allproduct',{
            products: product,
            searchoption: req.query.input_product
        })
    } catch {
        res.redirect('/allproduct')
    }
})

router.get('/:id', async (req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.render('product_info',{
            products: product
        })
    } catch(err) {
        console.log(err)
    }
})


module.exports = router