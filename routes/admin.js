const express = require('express')
const multer = require('multer')
const path = require('path')
const Product = require('../model/product_schema')
//const uploadPath = path.join('public',Product.productImagePath)
const router = express.Router()
const imagemimeTypes = ['images/jpeg','images/png' , 'images/gif','images/jpg'] 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      /*Appending extension with original name*/
      cb(null, file.originalname) 
    }
  })
  
  var upload = multer({ storage: storage });

router.get('/', (req,res) => {
    res.render('admin')
})

router.get('/new' ,(req,res) => {
    res.render('utils/new')
})

router.post('/new', upload.single('productImage') , async (req,res) => {
    const fileName = req.file != null ? req.file.filename : null
    const product = new Product({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        productImage: fileName
    })
    try {
        console.log(fileName)
        console.log(req.file.path)
        const newProduct = await product.save()
        res.redirect('/admin')
    } catch {
        res.render('utils/new',{
            errorMessage:"err"
        })
    } 

})
router.get('/update',(req,res) => {

})

module.exports = router