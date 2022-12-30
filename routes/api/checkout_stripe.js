const express = require('express');
const orderDAL = require('../../dal/orders');
const router = express.Router();

const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// router.get('/', async (req, res) => {

//     console.log("can fetch get route for separate stripe")

//     res.json({
//         "message": "get works for separate stripe"
//     })
// })



router.post('/', express.raw({ type: 'application/json' }),
    async (req, res) => {


        console.log("entered the stripe return order message.")


        let payload = req.body;
        // console.log("Payload", payload)
        let endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
        // console.log("esecret", endpointSecret);
        let signature = req.headers["stripe-signature"];
        // console.log("sign", signature);

        // console.log("secret key", process.env.STRIPE_SECRET_KEY)

        let event = null;
        // CAN SHOW FROM PAYLOAD TYPE = 'checkout.session.completed'

        // WHY IS THE EVENT NOT RUNNING. NO EVENT DATA

        try {

            // console.log("entered the try catch route")
            // console.log("STRIPE obj", Stripe)
            event = Stripe.webhooks.constructEvent(req.body, signature, endpointSecret);

            console.log("event1", event)

        } catch (e) {

            res.status(500)
            res.send({
                'error': e.message

            })
            return;
        }
        console.log("event2", event);

        if (event?.type == "checkout.session.completed") {
            console.log(event.data.object)
            // console.log("the webhook route ran")
            //SECOND PART OF PROJECT 3 IMPLEMENTATION 
            //TO CONTINUE FROM HERE TO CREATE NEW ORDER, SET DELIVERY STATUS, SEND RECEIPT PDF


            //TO CONTINUE HERE TO MAKE ORDER MANAGEMENT
            let stripeSession = event.data.object
            console.log(stripeSession);




            const shipping_address_collection = stripeSession.shipping_details;
            console.log("shipping_address_collection", shipping_address_collection);


            // CREATE INVOICE LINE ITEM

            const status = stripeSession.status;

            // PUT IN EMPLOYEE OFFICE CODE



            // CREATE ORDER 

            const paymentIntent2 = await Stripe.paymentIntents.retrieve(
                stripeSession.payment_intent
            );
            // console.log("payment_intent2", paymentIntent2);

            // CREATE DATE TIME OF DELIVERY 
            const forDateTime = paymentIntent2.created
            const convertTodayOrderDate01 = forDateTime * 1000
            const deliverDateOneWeek = new Date(convertTodayOrderDate01 + 7 * 24 * 60 * 60 * 1000)
            // console.log("forDateTime", forDateTime)
            // console.log("convertTodayOrderDate", convertTodayOrderDate)
            // console.log("deliverDateOneWeek", deliverDateOneWeek)

            const convertTodayOrderDate = new Date(forDateTime * 1000)
            // console.log("convertTodayOrderDate", convertTodayOrderDate)


            // Add the metadata
            const metaData = JSON.parse(stripeSession.metadata.orders);
            // const metaData = stripeSession.metadata;
            // console.log("metadata", metaData)

            const invoice = stripeSession.invoice
            // console.log("invoice", invoice)

            const invoiceObject = await Stripe.invoices.retrieve(
                invoice
            );
            // console.log("invoiceObject", invoiceObject)
            const hostedInvoiceUrl = invoiceObject.hosted_invoice_url
            // console.log("hostedInvoiceUrl", hostedInvoiceUrl)

            const paymentMethodTypes = paymentIntent2.payment_method_types;
            // console.log("paymentMethodTypes", paymentMethodTypes);


            const totalAmount = stripeSession.amount_total
            // console.log("totalAmount", totalAmount);

            const currentAccountId = metaData[0].account_id
            // console.log("currentAccountId", currentAccountId)


            const payment_status = stripeSession.payment_status;
            console.log("payment_status", payment_status);

            // Order status 2 is processing , status 1 is paid
            let orderStatus = 2;
            if (payment_status == "paid") {
                orderStatus = 1;
            }

            //create billingAddressObject
            const billingAddressObject = {
                billing_country: stripeSession.customer_details.address.country,
                billing_address_1: stripeSession.customer_details.address.line1,
                billing_address_2: stripeSession.customer_details.address.line2,
                billing_postal_code: stripeSession.customer_details.address.postal_code,

            }

            //create shippingAddressObject
            const shippingAddressObject = {
                shipping_country: paymentIntent2.shipping.address.country,
                shipping_address_1: paymentIntent2.shipping.address.line1,
                shipping_address_2: paymentIntent2.shipping.address.line2,
                shipping_postal_code: paymentIntent2.shipping.address.postal_code,
            }

            const orderDetails = {
                account_id: currentAccountId,
                total_cost: totalAmount,
                receipt_url: hostedInvoiceUrl,
                payment_type: paymentMethodTypes,
                payment_reference: stripeSession.payment_intent,
                order_date: convertTodayOrderDate,
                delivery_date: deliverDateOneWeek,
                order_status_id: orderStatus,
                payment_reference: paymentIntent2,


                shipping_country: shippingAddressObject.shipping_country,
                shipping_address_1: shippingAddressObject.shipping_address_1,
                shipping_address_2: shippingAddressObject.shipping_address_2,
                shipping_postal_code: shippingAddressObject.shipping_postal_code,
                billing_country: billingAddressObject.billing_country,
                billing_address_1: billingAddressObject.billing_address_1,
                billing_address_2: billingAddressObject.billing_address_2,
                billing_postal_code: billingAddressObject.billing_postal_code,

            }
            console.log("orderDetails", orderDetails);


            // const makeOrder = await orderDAL.addOrder(orderDetails);
           

             console.log("metadata", metaData)



        }

        res.sendStatus(200);




    }
)

module.exports = router