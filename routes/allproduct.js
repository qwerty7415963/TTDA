const express = require('express')
const router = express.Router()
const Product = require('../model/product_schema')

router.get('/',async (req,res) => {
    console.log(req.isAuthenticated())
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

router.get('/:id', (req,res) => {
    res.send(req.params.id)
})


module.exports = router