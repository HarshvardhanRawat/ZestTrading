require('dotenv').config();

if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
    console.error("FATAL ERROR: JWT_SECRET and MONGO_URI must be set in .env");
    process.exit(1);
}

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const tradeRoutes = require('./routes/tradeRoutes');
const authRoutes = require('./routes/AuthRoute');

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, '') : null;

const corsOptions = {
    origin: frontendUrl ? [frontendUrl] : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5713'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Collapses double slashes in paths (e.g. //login -> /login)
app.use((req, res, next) => {
    req.url = req.url.replace(/\/{2,}/g, '/');
    next();
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', tradeRoutes);
app.use('/', authRoutes);

mongoose.connect(URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });