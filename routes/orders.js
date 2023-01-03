const express = require("express");
const orderDAL = require("../dal/orders");
const router = express.Router()
const hbs = require("hbs");
const { createOrderUpdateForm, bootstrapField, ordersSearchForm } = require("../forms");
const { Order } = require("../models");

router.get('/', async (req, res) => {
    // res.json({'orders':allOrders.toJSON()})

    hbs.handlebars.registerHelper("changeDateTime", function (date) {
        return date.toISOString().slice(0, 19);

    })
    //can use a helper to print different card for tags

    const allOrderStatuses = await orderDAL.getAllOrderStatus()

    const makeOrderForm = ordersSearchForm(allOrderStatuses)

    const q = Order.collection();

    makeOrderForm.handle(req, {
        'success': async function (form) {
            console.log("entered success route");
            console.log(form.data);

           
            // console.log("form date", form.data.delivery_date)
            // if (form.data.delivery_date) {
            //     q.where('order_date', '>=', form.data.delivery_date)

            // }

            if (form.data.min_cost) {
                q.where('total_cost', '>=', form.data.min_cost)

            }
            if (form.data.max_cost) {
                q.where('total_cost', '<=', form.data.max_cost)

            }
            if (form.data.payment_type) {
                q.where('payment_type', '=', form.data.payment_type)

            }
            
            if (form.data.order_status_id) {
                q.where('order_status_id', '=', form.data.order_status_id)

            }

            // if (form.data.smells) {
            //     q.query('join', 'smells_soaps', 'soaps.id', 'soap_id')
            //         .where('smell_id', 'in', form.data.smells.split(','))
            // }

            // const allOrders = await q.fetch({
            //     withRelated: ['base', 'oil', 'type', 'purposes', 'smells']
            // })
            const allOrders = await q.fetch({
                'withRelated': ['order_items', 'account', 'order_status']
            })

            console.log(allOrders.toJSON())

            res.render('orders/index',
                {
                    'allOrders': allOrders.toJSON(),
                    'form': makeOrderForm.toHTML(bootstrapField)
                })


        },
        'empty': async function (form) {



            const allOrders = await orderDAL.getAllOrders()

            //Refactoring
            // const products = await dataLayer.getAllProducts();
            console.log("enter empty route");
            // console.log(products.toJSON());


            // res.send("empty route entered");


            res.render('orders/index',
                {
                    'allOrders': allOrders.toJSON(),
                    'form': makeOrderForm.toHTML(bootstrapField)
                })

        },
        'error': async function (form) {

            const allOrders = await orderDAL.getAllOrders()


            res.render('orders/index',
                {
                    'allOrders': allOrders.toJSON(),
                    'form': form.toHTML(bootstrapField)
                })

        }

    })







})

router.get("/update/:order_id", async (req, res) => {

    const order = await orderDAL.getOrderUsingId(req.params.order_id)


    const allOrderStatuses = await orderDAL.getAllOrderStatus()
    // console.log(allOrderStatuses);

    const updateOrderForm = createOrderUpdateForm(allOrderStatuses);

    updateOrderForm.fields.shipping_address_1.value = order.get('shipping_address_1')
    updateOrderForm.fields.shipping_address_2.value = order.get('shipping_address_2')
    updateOrderForm.fields.shipping_postal_code.value = order.get('shipping_postal_code')
    updateOrderForm.fields.delivery_date.value = order.get('delivery_date')
    updateOrderForm.fields.order_status_id.value = order.get('order_status_id')

    // res.render("orders/update" , {
    //     'form': updateOrderForm.toHTML(bootstrapField),
    //     "order": order.toJSON(),
    // })

    res.render('orders/update', {
        'form': updateOrderForm.toHTML(bootstrapField)
    })
})

router.post('/update/:order_id', async (req, res) => {

    const order = await orderDAL.getOrderUsingId(req.params.order_id);

    const allOrderStatuses = await orderDAL.getAllOrderStatus()
    // console.log(allOrderStatuses);

    const updateOrderForm = createOrderUpdateForm(allOrderStatuses);

    updateOrderForm.handle(req, {
        'success': async function (form) {

            console.log("success");
            console.log("form data", form.data)

            // let { order_status_id, ...otherData } = form.data

            // let orderToJSON = order.toJSON();
            // console.log("orderToJSON", orderToJSON)
            // modifiedObject = {
            //     ...orderToJSON,
            //     ...form.data
            // }
            // console.log("modifiedObject", modifiedObject)


            let { ...orderData } = form.data

            order.set(orderData);


            // order.set(modifiedObject); 

            await order.save();
            req.flash('success_messages', `Your order with 'ID: ${order.get('id')}' is updated with success.`)
            res.redirect('/orders');

        }
        ,
        'error': function (form) {
            console.log("error");
            res.send("error");

            // res.render('accounts/register', {
            //     'form': form.toHTML(bootstrapField)
            // })


        },
        'empty': function (form) {
            console.log("empty");
            res.send("empty");

            // res.render('accounts/register', {
            //     'form': form.toHTML(bootstrapField)
            // })
        }

    })

})




module.exports = router;