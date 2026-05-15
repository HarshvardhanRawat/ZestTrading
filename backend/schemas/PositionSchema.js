const {Schema} = require('mongoose');

const PositionSchema = new Schema({
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