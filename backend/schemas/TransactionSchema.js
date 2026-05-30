const { Schema } = require("mongoose");

const TransactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    type: {
        type: String,
        required: true,
    },
    desc: String,
    date: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    typeClass: String,
    statusClass: String,
});

module.exports = { TransactionSchema };
