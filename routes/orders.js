const express = require("express");
const orderDAL = require("../dal/orders");
const router = express.Router()
const hbs = require("hbs");
const { createOrderUpdateForm, bootstrapField } = require("../forms");

router.get('/', async (req, res) => {


    const allOrders = await orderDAL.getAllOrders()

    console.log(allOrders.toJSON());

    // res.json({'orders':allOrders.toJSON()})

    hbs.handlebars.registerHelper("changeDateTime", function (date) {
        return date.toISOString().slice(0, 19);

    })
    //can use a helper to print different card for tags


    res.render('orders/index',
        { 'allOrders': allOrders.toJSON() })


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
            

            let {...orderData} = form.data

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