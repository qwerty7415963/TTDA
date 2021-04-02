const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../../model/user_schema')

function initialize(passport, email) {
  const authenticateUser = (email, password, done) => {
    User.findOne({email:email},async(err,user) => {
      if (user == null) {
        return done(null, false, { message: 'No user with that email' })
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        return done(e)
      }
    })
  }

  passport.use(new LocalStrategy({ usernameField: 'email',passwordField:"password"}, authenticateUser))
  passport.serializeUser((user, done) => {console.log(user);done(null, user.id)})
  passport.deserializeUser((id, done) => {
    User.findById(id, (err,user) => {
      return done(null,user)
    })
  })
}

module.exports = initialize