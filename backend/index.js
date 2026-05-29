require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');

const { HoldingModel } = require('./model/HoldingsModel');
const { PositionModel } = require('./model/PositionModel');
const { WatchlistModel } = require('./model/WatchlistModel');
const { OrderModel } = require('./model/OrdersModel');

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json());

app.get('/allHoldings', async (req, res) => {
    try {
        let allHoldings = await HoldingModel.find({});
        res.json(allHoldings);
    } catch (err) {
        console.error('Error fetching holdings:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/allPositions', async (req, res) => {
    try {
        let allPositions = await PositionModel.find({});
        res.json(allPositions);
    } catch (err) {
        console.error('Error fetching positions:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/allWatchlist', async (req, res) => {
    try {
        let allWatchlist = await WatchlistModel.find({});
        res.json(allWatchlist);
    } catch (err) {
        console.error('Error fetching watchlist:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/allOrders', async (req, res) => {
    try {
        let allOrders = await OrderModel.find({});
        res.json(allOrders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/newOrder', (req, res) => {
    try {
        let newOrder = new OrderModel({
            instrument: req.body.instrument,
            exchange: req.body.exchange,
            type: req.body.type,
            qty: req.body.qty,
            price: req.body.price,
            status: req.body.status,
            time: req.body.time,
            typeClass: req.body.typeClass,
            statusClass: req.body.statusClass,
        });
        newOrder.save();
        res.send("Order placed successfully");
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
        mongoose.connect(URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
});