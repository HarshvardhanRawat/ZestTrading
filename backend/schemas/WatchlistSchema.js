const {Schema} = require('mongoose');

const WatchlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    id: Number,
    name: String,
    exchange: String,
    price: Number,
    percent: Number,
    isDown: Boolean,
});

module.exports = WatchlistSchema;