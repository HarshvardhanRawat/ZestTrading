const { Schema } = require('mongoose');

const OrdersSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
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