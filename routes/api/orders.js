const express = require('express');
const { getOrderUsingId, getOrderUsingAccount } = require('../../dal/orders');
const { checkIfAuthenticatedJWT } = require('../../middlewares/validationJWT');
const router = express.Router();

router.get('/',checkIfAuthenticatedJWT, async (req, res) => {

    // const currentAccountId = 2
    const currentAccountId = req.account.id;

    const userOrders = await getOrderUsingAccount(currentAccountId);
    console.log("userOrders", userOrders.toJSON())

    res.status(200)
    res.json(userOrders)


})

module.exports = router;