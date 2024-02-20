const mongoose = require('mongoose');
require('dotenv').config();


function connect() {
    

    if (!process.env.DATABASE_URL) {
        // needs to be changed to improve security of the database
        process.env.DATABASE_URL = 'mongodb+srv://benmitchell0405:Password123@cluster0.zwmwjos.mongodb.net/test'
    }

    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            const currentDB = mongoose.connection.db.databaseName;
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
}

module.exports = { connect };