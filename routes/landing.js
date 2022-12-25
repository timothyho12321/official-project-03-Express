const express = require("express");
const { Account, Soap, Order, Base, Variant } = require("../models");
const router = express.Router();



router.get('/', async (req, res) => {

    // const account = await Account.collection().fetch({
    //     withRelated: ['role']
    // })


    // let converted = soap.toJSON()

    // console.log("Soap.id", converted[0].id);

    // console.log("Soap.id", converted[0].oil);

    // console.log("Base", converted[0].base);


    const order = await Order.collection().fetch({
        withRelated: ['account', 'order_status']
    })

    // console.log(order.toJSON());
    // res.json({ 'results': order.toJSON() })


    const soapwithAll = await Soap.collection().fetch({
        withRelated: ['base', 'oil', 'type', 'purposes', 'smells']
    })

    
    const variant = await Variant.collection().fetch({
        withRelated: ['color', 'soap']
    })

    console.log(variant.toJSON());
    res.json({ 'results': variant.toJSON() })


    // res.render('landing/index')
})


router.get('/about-us', (req, res) => {


    res.render('landing/about-us')
})

router.get('/contact-us', (req, res) => {


    res.render('landing/contact-us')
})


module.exports = router;