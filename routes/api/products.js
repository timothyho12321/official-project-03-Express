const express = require('express');
const productDAL = require('../../dal/products');
const router = express.Router()


router.get('/', async (req,res)=> {

const allProducts = await productDAL.getAllProducts()
console.log(allProducts.toJSON());


res.status(200)
res.json({
    'message':allProducts
})
})



router.get('/search', async (req,res)=> {

    
    })


module.exports = router;