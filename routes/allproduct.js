const express = require('express')
const router = express.Router()
const Product = require('../model/product_schema')

router.get('/',async (req,res) => {
    let searchoption = {}
    if(req.query.input_product != null && req.query.input_product !== ""){
        searchoption.name = new RegExp(searchoption.name,'i')
    }
    try{
        const product = await Product.find(searchoption)
        res.render('allproduct',{
            product: product,
            searchoption: req.query.input_product
        })
    } catch {
        res.redirect('/allproduct')
    }
})


module.exports = router