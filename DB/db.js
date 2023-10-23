function dbConnect() {
    const mongoose = require("mongoose");
    require('dotenv').config();
    const MONGO_DB_URI = process.env.MONGO_DB_URI;
    try {
        console.log(MONGO_DB_URI);
        mongoose.connect(MONGO_DB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', err.message);
    }

}
module.exports = dbConnect;
