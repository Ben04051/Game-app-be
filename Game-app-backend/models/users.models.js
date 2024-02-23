const connection = require('../connection')
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
}, {collection: 'users'})

let UserModel;

const getUserModel = () => {
    if (!UserModel){
    UserModel = mongoose.model("users", UserSchema)
    }
    return UserModel
}

exports.retrieveAllUsers = () => {
    connection.connect()
    const model = getUserModel()
    return model.find().then((users) => {
        return users
    })
}

exports.retrieveUser = (username) => {
    connection.connect()
    const model = getUserModel()
    return model.findOne({username: username}).then((user) => {
        if(user === null) {
            return Promise.reject({status: 404, msg: "404: User not found"})
        }
        return user
    })
}

exports.addNewUser = (username, password) => {
    if(typeof username !== "string" || typeof password !== "string") {
        return Promise.reject({status: 400, msg: "Bad Request"})
    }
    connection.connect()
    const model = getUserModel()

    return model.findOne({username}).then((existingUser) => {
        if(existingUser) {
            return Promise.reject({status: 400, msg: "Username already exists"})
        }
        else{
            return model.create({username, password}).then((user) => {
                return user
            })
        }
    })
}

exports.removeUser = (username) => {
    connection.connect()
    const model = getUserModel()
    return model.findOne({username}).then((existingUser) => {
        if(!existingUser){
            return Promise.reject({status: 404, msg: "404: User not found"})
        }
        else {
            return model.deleteOne({username})
        }
    })
}