const fs = require('fs')
const express = require('express')
const multer = require('multer')
const path = require('path')
const Product = require('../model/product_schema')
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

router.get('/', async (req,res) => {
    let searchoption = {}
    if(req.query.input_product != null && req.query.input_product !== ""){
        searchoption.name = new RegExp(req.query.input_product,'i')
    }
    try{
        const product = await Product.find(searchoption)
        res.render('admin',{
            products: product,
            searchoption: req.query.input_product
        })
    } catch {
        res.redirect('/admin')
    }
})

router.get('/new' ,(req,res) => {
    renderNewPage(res, new Product())
})

router.post('/new', upload.single('productImage') , async (req,res) => {
    const fileName = req.file != null ? req.file.filename : null
    const product = new Product({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        productImage: fileName,
        filePath:req.file.path
    })
    try {
        const newProduct = await product.save()
        res.redirect('/admin')
    } catch {
        if(product.productImage != null) {
            fs.unlink(req.file.path, (err) => {if (err) console.log(err)})
            }
        renderNewPage(res, product, true)
    } 

})

router.get('/:id',(req,res) => {
    res.send("show" + req.params.id)
})

router.get('/:id/update',async(req,res) => {

    const product =  await Product.findById(req.params.id)
    try {
        res.render('utils/update',{
            product: product
        })
    } catch {
        res.redirect('/admin')
    }
})

router.put('/:id',upload.single("productImage"), async (req,res) => {
    const fileName = req.file != null ? req.file.filename : null
    console.log(fileName)
    let product
    try {
        product = await Product.findById(req.params.id)
        product.name = req.body.name
        product.quantity = req.body.quantity
        product.price = req.body.price
        product.productImage = fileName
        product.filePath = req.file.path
        await product.save((err,data) => {
            if(err) {
                console.log(err)
                return (err,null)
            }
            console.log(product)
            return (null,data)
        })
        console.log(product)
        res.redirect(`/admin/${product._id}`)
    } catch {
        if(product.productImage != null) {
            fs.unlink(req.file.path, (err) => {if (err) console.log(err)})
            }
        res.render('utils/update',{
            product: product,
            errorMessage:"Loi khong the sua san pham"
        })
    }

})

//delete
router.delete('/:id',async (req,res) => {
    let del_product
    try {
        del_product = await Product.findById(req.params.id)
        console.log(del_product.filePath)
        await del_product.remove()
        fs.unlink(del_product.filePath, (err) => {if(err) console.log(err)})
        res.redirect('/admin')
    } catch {
        res.render('admin',{
            errorMessage: `Cannot delete this product: ${del_product.name}`
        })
    }
})
async function renderNewPage(res ,product, hasError = false) {
    try {
        const product = await Product.find({})
        const params = {products: product}
        res.render('utils/new',params)
        if(hasError) params.errorMessage = "Loi khong the tao them san pham"
    } catch {
        res.redirect('/admin')
    }
}

module.exports = router