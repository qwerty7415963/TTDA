const express = require('express')
const router = express.Router()
const passport = require('passport')

const initializePassport = require('../public/js/passport_config')


router.get('/', (req, res) => {
    res.render('login.ejs')
  })
  
router.post('/',(req,res,next) => {
    initializePassport(passport,req.body.email)
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
  })(req,res,next);
})
 

module.exports = router
