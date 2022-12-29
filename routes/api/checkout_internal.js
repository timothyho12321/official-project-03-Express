const express = require('express');
const router = express.Router();

const CartServices = require('../../services/cart_items');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


router.get('/', async (req, res) => {

    // Only use when it is saved to req as object
    // currentAccountId = req.account.id 

    const currentAccountId = 5;

    const checkoutCart = new CartServices(currentAccountId);

    // get all the items from the cart
    let checkoutItems = await checkoutCart.getCart();


    let saveItemToJson = checkoutItems.toJSON();
    console.log(saveItemToJson);

    let itemCost;
    let itemName;
    let itemUrl = null;

    for (let item of saveItemToJson) {
        itemCost = item.variant.soap.cost
        console.log("itemCost", itemCost);

        itemName = item.variant.name
        console.log("itemCost", itemCost);

        itemUrl = item.variant.image_url
        console.log("itemUrl", itemUrl);
    }



    // step 1 - create line items

    let lineItems = [];
    let meta = [];
    for (let i of checkoutItems) {
        const lineItem = {
            'quantity': i.get('quantity'),
            'price_data': {
                'currency': 'SGD',
                'unit_amount': itemCost,
                'product_data': {
                    'name': itemName
                }
            }
        }


        if (itemUrl) {
             lineItem.price_data.product_data.images = [itemUrl];
        }
        lineItems.push(lineItem);

        // save the quantity data along with the product id
            meta.push({
                'product_id' : i.get('variant_id'),
                'quantity': i.get('quantity')
            })

    }

    // step 2 - create stripe payment

    let metaData = JSON.stringify(meta);
    const payment = {
        payment_method_types: ['card'],
        mode:'payment',
        line_items: lineItems,
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_ERROR_URL,
        billing_address_collection: 'required',
    	shipping_address_collection: {
    		allowed_countries: ['SG']
    	},
        metadata: {
            'orders': metaData
        }
    }

    // step 3: register the session

    let stripeSession = await Stripe.checkout.sessions.create(payment)
    console.log(stripeSession);
    console.log("Reached until checkout render")
    res.render('checkout_internal/checkout', {
        'sessionId': stripeSession.id, // 4. Get the ID of the session
        'publishableKey': process.env.STRIPE_PUBLISHABLE_KEY
    })


    // res.json({
    //     // "message": dotGet
    //     "message": saveItemToJson
    // })

})

router.get("/success", function(req,res){
    res.json({
        "message": "Stripe payment submitted."
    })
})


module.exports = router

