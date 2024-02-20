const mongoose = require('mongoose')

function connect() {
    mongoose.connect('mongodb+srv://benmitchell0405:Password123@cluster0.zwmwjos.mongodb.net/test')
        .then(() => {
            console.log("Connected to MongoDB");
            const currentDB = mongoose.connection.db.databaseName;
            console.log("Current database:", currentDB);
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
}
  module.exports = {connect};