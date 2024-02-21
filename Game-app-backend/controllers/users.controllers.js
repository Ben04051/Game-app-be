const {retrieveAllUsers} = require('../models/users.models')

exports.getAllUsers = (req,res,next) => {

    return retrieveAllUsers().then((users) => {
        console.log(users)
        res.status(200).send({users})
    }).catch((err) => {
        next(err)
    })

}