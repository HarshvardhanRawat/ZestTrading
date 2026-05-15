const {Schema} = require('mongoose');

const WatchlistSchema = new Schema({
    id: Number,
    name: String,
    exchange: String,
    price: Number,
    percent: Number,
    isDown: Boolean,
});

module.exports = WatchlistSchema;