if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const initializepassport = require('./public/js/passport_config')


app.set('view engine',"ejs")
app.set("views", __dirname + "/views")

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '10mb' ,extended: false}))
app.use(passport.initialize())
app.use(flash())
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}))

//mongoose connect
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection
db.on("error",(err) => console.log(err))
db.once("open",() => console.log("connected to mongoose"))
//

//routes
const homeroute = require('./routes/home')
const signuproute = require('./routes/signup')
const loginroute = require('./routes/login')
const allproductroute = require('./routes/allproduct')

app.use('/',homeroute)
app.use('/signup',signuproute)
app.use('/login',loginroute)
app.use('/allproduct',allproductroute)
//

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running at port 3k")
})