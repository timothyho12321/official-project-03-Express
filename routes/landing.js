const express = require("express");
const { Account, Soap, Order } = require("../models");
const router = express.Router();



router.get('/', async (req, res) => {

    // const account = await Account.collection().fetch({
    //     withRelated: ['role']
    // })


    // NEED TO DEBUG WHY DOES NOT RETURN WITH RELATED BASE RESULT 
    // const soap = await Soap.collection().fetch({
    //     withRelated: ['oil', 'type', 'base']
    // })

    // console.log(soap.toJSON());
    // res.json({'results':soap.toJSON()})


    const order = await Order.collection().fetch({
        withRelated: ['account', 'order_status']
    })

    console.log(order.toJSON());
    res.json({'results':order.toJSON()})

    // res.render('landing/index')
})


router.get('/about-us', (req, res) => {


    res.render('landing/about-us')
})

router.get('/contact-us', (req, res) => {


    res.render('landing/contact-us')
})


module.exports = router;