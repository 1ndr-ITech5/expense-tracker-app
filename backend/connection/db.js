const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // try to connect with mongo
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB was connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting with MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;