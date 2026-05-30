const {Schema} = require('mongoose');

const PositionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    name: String, 
    desc: String, 
    product: String, 
    qty: Number, 
    avg: Number, 
    ltp: Number, 
    pl: Number, 
    type: String,
});

module.exports = { PositionSchema };