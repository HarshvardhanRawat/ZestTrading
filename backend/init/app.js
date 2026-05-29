const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const watchlistData = require('./WatchlistData');
const holdingData = require('./HoldingData');
const positionData = require('./PositionData');
const ordersData = require('./OrdersData');

const { WatchlistModel } = require('../model/WatchlistModel');
const { HoldingModel } = require('../model/HoldingsModel');
const { PositionModel } = require('../model/PositionModel');
const { OrdersModel } = require('../model/OrdersModel');

const main = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
};

const initDB = async () => {
    // Clear all collections
    await WatchlistModel.deleteMany({});
    await HoldingModel.deleteMany({});
    await PositionModel.deleteMany({});
    await OrdersModel.deleteMany({});

    // Seed Watchlist
    for (const watchItem of watchlistData.watchlist) {
        const newWatchItem = new WatchlistModel(watchItem);
        await newWatchItem.save();
    }

    // Seed Holdings
    for (const holdingItem of holdingData.holdings) {
        const newHoldingItem = new HoldingModel(holdingItem);
        await newHoldingItem.save();
    }

    // Seed Positions
    for (const positionItem of positionData.positions) {
        const newPositionItem = new PositionModel(positionItem);
        await newPositionItem.save();
    }

    // Seed Orders
    for (const orderItem of ordersData.orders) {
        const newOrderItem = new OrdersModel(orderItem);
        await newOrderItem.save();
    }

    console.log('Database initialized with all sample data (Watchlist, Holdings, Positions, Orders)');
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

