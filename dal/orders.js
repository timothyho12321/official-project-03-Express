const { Order } = require("../models")


const addOrder = async (orderDetails) => {
    const order = new Order();
    order.set(orderDetails);

    await order.save();
    return order
}


module.exports =
{
    addOrder,
}