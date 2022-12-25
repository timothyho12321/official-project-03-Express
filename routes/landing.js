const express = require("express");
const { Account, Soap, Order, Base } = require("../models");
const router = express.Router();



router.get('/', async (req, res) => {

    // const account = await Account.collection().fetch({
    //     withRelated: ['role']
    // })


    // NEED TO DEBUG WHY DOES NOT RETURN WITH RELATED BASE RESULT 
    // const soap = await Soap.collection().fetch({
    //     withRelated: ['oil', 'type', 'base']
    // })
    let soap;
    try {
        soap = await Soap.collection().fetch({
            withRelated: ['base', 'oil', 'type']
        })
    }
    catch (e) {

        console.log(e)
    }


    //  new Soap({ id: 4 }).fetch({ debug: true, withRelated: ['oil'] }).then(soap => {
    //     // ...
    //     console.log(soap.related('oil').toJSON())
    // })

    // new Soap({ id: 4 }).fetch({ debug: true, withRelated: ['type'] }).then(soap => {
    //     // ...
    //     console.log(soap.related('type').toJSON())
    // })

    // new Soap({ id: 4 }).fetch({ debug: true, withRelated: ['base'] }).then(soap => {
    //     // ...
    //     console.log(soap.related('base').toJSON())
    // })

    let converted = soap.toJSON()

    console.log("Soap.id", converted[0].id);

    console.log("Soap.id", converted[0].oil);

    // base undefined 
    console.log("Base", converted[0].base);

    // console.log(soap.toJSON());
    res.json({ 'results': soap.toJSON() })





    // const order = await Order.collection().fetch({
    //     withRelated: ['account', 'order_status']
    // })

    // console.log(order.toJSON());
    // res.json({'results':order.toJSON()})

    // res.render('landing/index')
})


router.get('/about-us', (req, res) => {


    res.render('landing/about-us')
})

router.get('/contact-us', (req, res) => {


    res.render('landing/contact-us')
})


module.exports = router;