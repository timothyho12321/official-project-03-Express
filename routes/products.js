const express = require("express");
const { createProductForm, bootstrapField } = require("../forms");
const { Account, Soap, Order, Base, Variant, CartItem, OrderItem, Type, Smell, Purpose, Oil } = require("../models");
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


    const allSmells = await Smell.fetchAll().map(s =>
        [s.get('id'), s.get('smell')])
    
        const allPurposes  = await Purpose.fetchAll().map(p =>
        [p.get('id'), p.get('purpose')])
    
        const allBases = await Base.fetchAll().map(b =>
        [b.get('id'), b.get('base')])
   
        const allOils  = await Oil.fetchAll().map(o =>
        [o.get('id'), o.get('oil')])




    const allTypes = await Type.fetchAll().map(t =>
        [t.get('id'), t.get('type')])




    const productForm = createProductForm(allSmells,
        allPurposes, allBases, allOils, allTypes);

    res.render('products/create', {
        'form': productForm.toHTML(bootstrapField),
    })


})


module.exports = router;