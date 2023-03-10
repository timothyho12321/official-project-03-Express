const express = require('express');
const productDAL = require('../../dal/products');
const validationReq = require('../../middlewares/validationReq');
const { Soap } = require('../../models');
const { searchSchema } = require('../../validations/productValidation');
const router = express.Router()


router.get('/', async (req, res) => {

    const allProducts = await productDAL.getAllProducts()
    console.log(allProducts.toJSON());


    res.status(200)
    res.json({
        'message': allProducts
    })

    // res.json(allProducts)
})



router.get('/search', validationReq(searchSchema), async (req, res) => {
    console.log("route calledddd =>>>>>")
    const q = Soap.collection();
    let doSearch = false;

    for (let [eachKey, eachValue] of Object.entries(req.query)) {
        // console.log("entered for loop")
        console.log(`${eachKey}: ${eachValue}`)

        if (eachValue.length > 0) {
            doSearch = true
        }

    }
    // if (doSearch) {
    //     console.log("doSearch is true")
    // } else {
    //     console.log("doSearch is false")
    // }

    if (doSearch) {
        // console.log("filter search route entered");
        if (req.query.name) {
            q.where('name', 'like', '%' + req.query.name + '%')
        }

        if (req.query.min_cost) {
            q.where('cost', '>=', req.query.min_cost)
        }
        if (req.query.max_cost) {
            q.where('cost', '<=', req.query.max_cost)
        }
        if (req.query.min_height) {
            q.where('height', '>=', req.query.min_height)
        }
        if (req.query.max_height) {
            q.where('height', '<=', req.query.max_height)
        }
        if (req.query.min_width) {
            q.where('width', '>=', req.query.min_width)
        }
        if (req.query.max_width) {
            q.where('width', '<=', req.query.max_width)
        }
        if (req.query.oils) {
            q.where('oil_id', '=', req.query.oils)
        }
        if (req.query.smells) {
            // console.log("entered search smell route")
            // console.log("see smell query",req.query.smells)

            makeToString = req.query.smells.toString()
            // console.log("makeToString",makeToString)
            split = makeToString.split(',')
            
            // split = req.query.smells.split(',')
            // console.log("split",split)


            q.query('join', 'smells_soaps', 'soaps.id', 'soap_id')
            .where('smell_id', 'in', split)

            // q.query('join', 'smells_soaps', 'soaps.id', 'soap_id')
            //     .where('smell_id', 'in', req.query.smells.split(','))
        }
        const products = await q.fetch({
            withRelated: ['base', 'oil', 'type', 'purposes', 'smells']
        })

        console.log(products.toJSON())
        res.status(200)
        res.json({
            'message': products
        })

    } else {
        // console.log("search all route entered");
        const allProducts = await productDAL.getAllProducts()
        console.log(allProducts.toJSON());

        res.status(200)
        res.json({
            'message': allProducts
        })

    }


})

router.get('/:product_id/variants' , async (req , res) => {
    // const variants = await productDAL.getVariantById(req.params.product_id)
    
    const variants = await productDAL.getVariantByProductId(req.params.product_id)
    
    console.log(variants.toJSON());
    res.status(200)
    res.json(variants)
})


module.exports = router;