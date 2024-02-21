const retrieveAllUsers = require('../models/users.models')

exports.getAllUsers = () => {

    return retrieveAllUsers().then((users) => {
        res.status(200).send({users})
    }).catch((err) => {
        next(err)
    })

}