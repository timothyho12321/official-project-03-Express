const { Order, OrderStatus, OrderItem } = require("../models")


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


const getAllOrders = async () => {
    const allOrders = await Order.collection().fetch({
        'withRelated': ['order_items', 'account', 'order_status']
    })

    return allOrders;

}


const getOrderUsingId = async (orderId) => {

    const order = await Order.where({
        'id': orderId
    }).fetch({
        'withRelated': ['order_items', 'account', 'order_status'],
        require: true
    })

    return order;

}


const getAllOrderStatus = async () => {
    const allOrderStatus = await OrderStatus.fetchAll().map(o =>
        [o.get('id'), o.get('status')])

    return allOrderStatus;

}

const getOrderUsingAccount = async (accountId) => {

    console.log("accountId",accountId)
    const order = await Order.where({
        'account_id': accountId
    }).fetchAll({
        'withRelated': ['order_items', 'account', 'order_status'],
        require: false
    })

    return order;

}


module.exports =
{
    addOrder,
    addOrderItem,
    getAllOrders,
    getOrderUsingId,
    getAllOrderStatus,
    getOrderUsingAccount
}