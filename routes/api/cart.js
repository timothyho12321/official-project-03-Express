const express = require('express');
const { checkIfAuthenticatedJWT } = require('../../middlewares/validationJWT');
const router = express.Router()
const CartServices = require('../../services/cart_items');

router.get('/', checkIfAuthenticatedJWT, async (req, res) => {

    // WHAT IS THE REQ.ACCOUNT.ID from???
    // const currentAccountId = req.account.id;

    // OLD const currentAccountId = 2;
    const currentAccountId = req.account.id
    console.log("currentAccountId", currentAccountId)

    let classCartServices = new CartServices(currentAccountId);
    const cartItems = await classCartServices.getCart(currentAccountId)

    // console.log("entered route for getcartitems")

    res.status(200);
    res.json(cartItems)

})


// router.post('/test/add', async (req, res) => {

//     console.log("entered test post route")

//     res.json({
//         'message': 'basic post route works.'
//     })

// })



router.post('/:variant_id/add', async (req, res) => {
    console.log("entered route for addcartitems")

    // const currentAccountId = req.account.id
    const currentAccountId = 2;
    const variantId = parseInt(req.params.variant_id)
    // console.log(variantId);
    const quantity = parseInt(req.body.quantity)
    // console.log(quantity);

    let checkError = false;
    if (!currentAccountId || !variantId) {
        checkError = true;
    }

    if (checkError) {
        res.status(400)
        res.json({
            'error_message': 'Please fill in all required fields.'
        })

    } else {

        let classCartServices = new CartServices(currentAccountId);
        const addedToCart = await classCartServices.addToCart(variantId, quantity)

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


router.put('/:variant_id/update', async (req, res) => {

    // const currentAccountId = req.account.id
    const currentAccountId = 2;
    const variantId = parseInt(req.params.variant_id)
    // console.log(variantId);
    const newQuantity = parseInt(req.body.quantity)
    // console.log(quantity);


    let checkError = false;
    if (!currentAccountId || !variantId) {
        checkError = true;
    }

    if (checkError) {
        res.status(400)
        res.json({
            'error_message': 'Please fill in all required fields.'
        })

    } else {

        let updateCartServices = new CartServices(currentAccountId);
        const updateCartQuantity = await updateCartServices.setQuantity(variantId, newQuantity)

        if (updateCartQuantity) {

            res.status(200);
            res.json({
                'cart_update_success': updateCartQuantity
            })
        } else {

            res.status(400)
            res.json({
                'error_message': 'Updating cart did not succeed. Please try again.'
            })
        }
    }

})


router.delete('/:variant_id/delete', async (req, res) => {

    // const currentAccountId = req.account.id
    const currentAccountId = 2;

    const variantId = parseInt(req.params.variant_id);
    // console.log(variantId);


    let checkError = false;
    if (!currentAccountId || !variantId) {
        checkError = true;
    }

    if (checkError) {
        res.status(400)
        res.json({
            'error_message': 'Please fill in all required fields.'
        })

    } else {

        let deleteCartServices = new CartServices(currentAccountId);
        const deleteVariantFromCart = await deleteCartServices.remove(variantId)

        if (deleteVariantFromCart) {

            res.status(200);
            res.json({
                'cart_delete_success': deleteVariantFromCart
            })
        } else {

            res.status(400)
            res.json({
                'error_message': 'Deleting variant item from cart did not succeed. Please try again.'
            })
        }
    }

})





module.exports = router;

