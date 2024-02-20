const mongoose = require('mongoose');
require('dotenv').config();

function connect() {
    

    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL not set');
    }

    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Connected to MongoDB");
            const currentDB = mongoose.connection.db.databaseName;
            console.log("Current database:", currentDB);
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
}

module.exports = { connect };