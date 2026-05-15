const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const initData = require('./WatchlistData');
const { WatchlistModel } = require('../model/WatchlistModel');

const main = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
};

const initDB = async () => {
    await WatchlistModel.deleteMany({});
    for (const watchItem of initData.watchlist) {
        const newWatchItem = new WatchlistModel(watchItem);
        await newWatchItem.save();
    }
    console.log('Database initialized with sample data');
};

main().then(() => {
    initDB().then(() => {
        console.log('Initialization complete');
        mongoose.disconnect();
    }).catch((err) => {
        console.error('Error initializing database:', err);
        mongoose.disconnect();
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

