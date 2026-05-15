require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;


app.listen(PORT, () => {
    try{
        console.log(`Server is running on port ${PORT}`);
        mongoose.connect(URI);
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('Error connecting to MongoDB:', err);
    }
});