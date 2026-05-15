const {Schema} = require('mongoose');

const HoldingSchema = new Schema({
    name: String, 
    desc: String, 
    qty: Number, 
    avg: Number, 
    ltp: Number, 
    curVal: Number, 
    pl: Number, 
    chg: String, 
    type: String,
});

module.exports = { HoldingSchema };