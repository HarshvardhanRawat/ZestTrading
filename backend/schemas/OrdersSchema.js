const { Schema } = require('mongoose');

const OrdersSchema = new Schema({
    instrument: String,
    exchange: String,
    qty: String,
    price: String,
    type: String,
    status: String,
    time: String,
    typeClass: String,
    statusClass: String,
});

module.exports = { OrdersSchema };