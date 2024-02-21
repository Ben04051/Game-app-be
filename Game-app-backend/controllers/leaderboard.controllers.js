const {retrieveLeaderboard} = require('../models/leaderboard.models')

exports.getLeaderboard = (req, res, next) => {

    return retrieveLeaderboard().then((leaderboard) => {
        res.status(200).send({leaderboard})

    }).catch((err) => {
        next(err)
    })
}