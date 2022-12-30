const { Order, OrderItem } = require("../models")


const addOrder = async (orderDetails) => {
    const order = new Order();
    order.set(orderDetails);

    await order.save();
    return order
}

const addOrderItem = async (orderItemDetails) => {
    const orderItem = new OrderItem();
    orderItem.set(orderItemDetails);

    await orderItem.save();
    return orderItem;
}


module.exports =
{
    addOrder,
    addOrderItem
}