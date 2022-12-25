const express = require("express");
const { createProductForm, bootstrapField } = require("../forms");
const { Account, Soap, Order, Base, Variant, CartItem, OrderItem } = require("../models");
const router = express.Router();


router.get('/', async (req, res) => {


    const soapwithAll = await Soap.collection().fetch({
        withRelated: ['base', 'oil', 'type', 'purposes', 'smells']
    })


    console.log(soapwithAll.toJSON())

    // res.json({ 'products': soapwithAll.toJSON() })

  
    res.render(
        'products/index',
        { 'products': soapwithAll.toJSON() })


})


///////////////////////////////////// Create Route /////////////////////////////////
router.get('/create', async (req, res) => {

const productForm = createProductForm();

res.render('products/create', {
    'form': productForm.toHTML(bootstrapField),
})


})


module.exports = router;