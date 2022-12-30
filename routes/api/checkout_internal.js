const express = require('express');
const router = express.Router();

const CartServices = require('../../services/cart_items');
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


router.get('/', async (req, res) => {

    // Only use when it is saved to req as object
    // currentAccountId = req.account.id 

    const currentAccountId = 2;

    const checkoutCart = new CartServices(currentAccountId);

    // get all the items from the cart
    let checkoutItems = await checkoutCart.getCart();


    let saveItemToJson = checkoutItems.toJSON();
    console.log("SEE CHECKOUT 2 ITEMS", saveItemToJson);


    // save item to json to read name variable 
    // need to debug here why does two different variant look the same on the checkout
    let itemsCost = [];
    let itemsName = [];
    let itemsUrl = [];

    for (let item of saveItemToJson) {
        itemCost = item.variant.soap.cost
        console.log("itemCost", itemCost);

        itemName = item.variant.name
        console.log("itemName", itemCost);

        itemUrl = item.variant.image_url
        console.log("itemUrl", itemUrl);

        itemsCost.push(itemCost);
        itemsName.push(itemName);
        itemsUrl.push(itemUrl);
    }

    
    // console.log("pushed itemsCost", itemsCost)
    // console.log("pushed itemsName", itemsName)
    // console.log("pushed itemsUrl", itemsUrl)

    // step 1 - create line items

    let lineItems = [];
    let meta = [];

    // used to read in values for submitting (from saveItemToJson)
    let counter = -1;
    for (let i of checkoutItems) {
        
        counter = counter + 1;
        
        console.log("pushed itemsName i", itemsName[counter])
        

        const lineItem = {
            'quantity': i.get('quantity'),
            'price_data': {
                'currency': 'SGD',
                'unit_amount': itemsCost[counter],
                'product_data': {
                    'name': itemsName[counter]
                }
            }
        }


        if (itemUrl) {
            lineItem.price_data.product_data.images = [itemsUrl[counter]];
        }
        lineItems.push(lineItem);

        // save the quantity data along with the product id
        meta.push({
            'variant_id': i.get('variant_id'),
            'quantity': i.get('quantity'),
            'account_id': currentAccountId
        })

    }

    // step 2 - create stripe payment

    let metaData = JSON.stringify(meta);
    const payment = {
        payment_method_types: ['card', 'paynow'],
        mode: 'payment',
        invoice_creation: { enabled: true },
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


    res.render('checkouts/checkout', {
        'sessionId': stripeSession.id, // 4. Get the ID of the session
        'publishableKey': process.env.STRIPE_PUBLISHABLE_KEYS
    })

    // res.status(200)
    // res.json({
    //     'sessionId': stripeSession.id, // 4. Get the ID of the session
    //     'publishableKey': process.env.STRIPE_PUBLISHABLE_KEYS
    // })

})


// router.post('/update_payment', express.raw({ type: 'application/json' }),
//     async (req, res) => {


//         console.log("entered the stripe return order message.")


//         let payload = req.body;
//         // console.log("Payload", payload)
//         let endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
//         // console.log("esecret", endpointSecret);
//         let signature = req.headers["stripe-signature"];
//         // console.log("sign", signature);

//         // console.log("secret key", process.env.STRIPE_SECRET_KEY)

//         let event = null;
//         // CAN SHOW FROM PAYLOAD TYPE = 'checkout.session.completed'

//         // WHY IS THE EVENT NOT RUNNING. NO EVENT DATA

//         try {

//             console.log("entered the try catch route")
//             // console.log("STRIPE obj", Stripe)
//             event = Stripe.webhooks.constructEvent(req.body, signature, endpointSecret);

//             console.log("event1", event)

//         } catch (e) {

//             res.status(500)
//             res.send({
//                 'error': e.message

//             })
//             return;
//         }
//         console.log("event2", event);

//         if (event?.type == "checkout.session.completed") {
//             console.log(event.data.object)
//             // console.log("the webhook route ran")
//             //SECOND PART OF PROJECT 3 IMPLEMENTATION 
//             //TO CONTINUE FROM HERE TO CREATE NEW ORDER, SET DELIVERY STATUS, SEND RECEIPT PDF


//             //TO CONTINUE HERE TO MAKE ORDER MANAGEMENT
//             let stripeSession = event.data.object
//             console.log(stripeSession);

//             const address = stripeSession.customer_details.address
//             // address is currently null except country
//             const invoice = stripeSession.invoice
//             // need to enable invoice_creation to enabled: true

//             const metadata = stripeSession.metadata;

//             const payment_intent = stripeSession.payment_intent;
//             // console.log(payment_intent);

//             const payment_method_types = stripeSession.payment_method_types[0];
//             // console.log(payment_method_types);
//             const payment_status = stripeSession.payment_status;


//             const shipping_address_collection = stripeSession.shipping_address_collection;


//             const status = stripeSession.status;

//         }

//         res.sendStatus(200);




//     }
// )





router.get("/success", function (req, res) {
    res.json({
        "message": "Stripe payment submitted."
    })
})


module.exports = router

