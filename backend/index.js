require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const tradeRoutes = require('./routes/tradeRoutes');
const authRoutes = require('./routes/AuthRoute');

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', tradeRoutes);
app.use('/', authRoutes);

app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
        mongoose.connect(URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
});