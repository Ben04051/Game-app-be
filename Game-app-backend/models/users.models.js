const connection = require('../connection')
const mongoose = require('mongoose')

exports.retrieveAllUsers = () => {
    connection.connect()

    const UserSchema = mongoose.Schema({
        username : String,
        password: String 
    })

    UserModel = mongoose.model("users", UserSchema)

    return UserModel.find().then((users) => {
        return users
    })


}