require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');

const { HoldingModel } = require('./model/HoldingsModel');
const { PositionModel } = require('./model/PositionModel');
const { WatchlistModel } = require('./model/WatchlistModel');

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


app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
        mongoose.connect(URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
});