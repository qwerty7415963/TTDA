const express = require('express')
const router = express.Router()
const User = require('../model/user_schema')
const bcrypt = require('bcrypt')

router.get('/',(req,res) => {
    res.render('signup')
})

router.post('/',async(req,res) => {
    try {
        let password = await bcrypt.hash(req.body.password,10)
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: password
        })
        const newUser = await user.save()
        res.redirect('/login')
    } catch  {
        res.render('signup',{
            errorMessage:'Error'
        })
    }
})

module.exports = router