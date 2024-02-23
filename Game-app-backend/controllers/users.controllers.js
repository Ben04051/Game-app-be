const {retrieveAllUsers, retrieveUser, addNewUser, removeUser} = require('../models/users.models')

exports.getAllUsers = (req,res,next) => {

    return retrieveAllUsers().then((users) => {
        res.status(200).send({users})
    }).catch((err) => {
        next(err)
    })

}

exports.getUser = (req,res,next) => {
    const {username} = req.params
    return retrieveUser(username).then((user) => {
        res.status(200).send({user})
    }).catch((err) => {
        next(err)
    })
}

exports.addUser = (req,res,next) => {
    const {username, password} = req.body
    return addNewUser(username, password).then((user) => {
        res.status(201).send({user})
    }).catch((err) => {
        next(err)
    })
}

exports.deleteUser = (req, res, next) => {
    const {username} = req.params
    return removeUser(username).then(() => {
        res.status(204).send()
    }).catch((err) => {
        next(err)
    })
}