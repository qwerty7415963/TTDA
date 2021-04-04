const express = require('express')
const { findById } = require('../model/bill')
const Bill = require('../model/bill')
const router = express.Router()

router.get('/',async (req,res) => {
    let searchoption = {}
    if(req.query.input_product != null && req.query.input_product !== ""){
        searchoption.name = new RegExp(req.query.input_product,'i')
    }
    try {
        const bill = await Bill.find(searchoption)
        res.render('utils/bill',{
            bills: bill
        })
    } catch (err) {
        console.log(err)
    }
})

router.delete('/:id',async(req,res) => {
    const bill = await Bill.findById(req.params.id)
    await bill.remove()
    res.redirect('/bill')
})

module.exports = router