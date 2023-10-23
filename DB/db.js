const mongoose = require('mongoose');
require('dotenv').config();

function dbConnect() {
    const MONGO_DB_URI = process.env.MONGO_DB_URI;
    try {
        mongoose.connect(MONGO_DB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}
module.exports = dbConnect;
