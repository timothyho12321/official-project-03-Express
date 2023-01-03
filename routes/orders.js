const express = require("express");
const { getAllOrders } = require("../dal/orders");
const router = express.Router()
const hbs = require("hbs");
const { createOrderUpdateForm } = require("../forms");

router.get('/', async (req, res) => {


    const allOrders = await getAllOrders()

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


    const order = await getOrderUsingId(req.params.order_id)

    console.log(order.toJSON());

    // const allOrderStatus = await orderDataLayer.getAllOrderStatus()

    // const orderUpdateForm = createOrdersUpdateForm(allOrderStatus)

    // orderUpdateForm.fields.shipping_address_1.value = order.get('shipping_address_1')
    // orderUpdateForm.fields.shipping_address_2.value = order.get('shipping_address_2')
    // orderUpdateForm.fields.shipping_postal_code.value = order.get('shipping_postal_code')
    // orderUpdateForm.fields.order_status_id.value = order.get('order_status_id')

    // res.render("orders/update" , {
    //     "form": orderUpdateForm.toHTML(bootstrapField),
    //     "order": order.toJSON(),
    // })
})

router.post('/update/:order_id', (req, res) => {




    const updateOrderForm = createOrderUpdateForm();

    updateOrderForm.handle(req, {
        'success': async function (form) {

            console.log("success");
            res.send("success");

            //     const account = new Account();

            //     const { confirm_password, ...otherData } = form.data

            //     otherData.password = getHashedPassword(otherData.password)
            //    otherData.role_id = 2;
            //     console.log(otherData);
            //     account.set(otherData)

            //     await account.save();
            //     req.flash('success_messages', `Your account ${account.get('first_name')} has been successfully created.`)
            //     res.redirect('/accounts/login');
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