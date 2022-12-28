const express = require('express');
const router = express.Router()
const CartServices = require('../../services/cart_items');

router.get('/', async (req, res) => {

    // WHAT IS THE REQ.ACCOUNT.ID from???
    // const currentAccountId = req.account.id;

    const currentAccountId = 5;

    let classCartServices = new CartServices(currentAccountId);
    const cartItems = await classCartServices.getCart(currentAccountId)

    // console.log("entered route for getcartitems")

    res.status(200);
    res.json({
        'currentCart': cartItems
    })

})


router.post('/test/add', async (req, res) => {

    console.log("entered test post route")

    res.json({
        'message': 'basic post route works.'
    })

})

/// QUESTION CANNOT EXECUTE POST ROUTE???
router.post('/:variant_id/add', async (req, res) => {
    console.log("entered route for addcartitems")

    // const currentAccountId = req.account.id
    const currentAccountId = 5
    const variantId = parseInt(req.params.variant_id)
    const quantity = parseInt(req.body.quantity)
    console.log(quantity);

    let checkError = false;
    if (!accountId || !variantId) {
        checkError = true;
    }

    if (checkError) {
        res.status(400)
        res.json({
            'error_message': 'Please fill in all required fields.'
        })

    } else {

        let classCartServices = new CartServices(currentAccountId);
        const addedToCart = await classCartServices.addToCart(currentAccountId, quantity)

        if (addedToCart) {

            res.status(200);
            res.json({
                'cart_added_success': addedToCart
            })
        } else {

            res.status(400)
            res.json({
                'error_message': 'Adding to cart did not succeed. Please try again.'
            })
        }

    }

})






module.exports = router;

