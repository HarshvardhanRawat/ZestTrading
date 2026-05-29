const { model } = require('mongoose');
const { OrdersSchema } = require('../schemas/OrdersSchema');

const OrderModel = new model('Order', OrdersSchema);

module.exports = { OrderModel, OrdersModel: OrderModel };