const express = require('express')
const router = express.Router()
const Product = require('../model/product_schema')

router.get('/',async (req,res) => {
    let searchoption = {}
    if(req.query.input_product != null && req.query.input_product !== ""){
        searchoption.input_product = new RegExp(searchoption.input_product,'i')
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


module.exports = router