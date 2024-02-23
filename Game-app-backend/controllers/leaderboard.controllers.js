const {retrieveLeaderboard, retrieveLeaderboardByUsername, addScoreToLeaderboard} = require('../models/leaderboard.models')

exports.getLeaderboard = (req, res, next) => {
    const {limit, p} = req.query
    return retrieveLeaderboard(limit, p).then((leaderboard) => {
        res.status(200).send({leaderboard})

    }).catch((err) => {
        next(err)
    })
}

exports.getLeaderboardByUsername = (req, res, next) => {
    const {username} = req.params
    const {limit, p} = req.query
    return retrieveLeaderboardByUsername(username, limit, p).then((leaderboard) => {
        res.status(200).send({leaderboard})
    }).catch((err) => {
        next(err)
    })
}

exports.postScoreToLeaderbord = (req, res, next) => {
    const {username, score} = req.body
    return addScoreToLeaderboard(username, score).then((score) => {
        res.status(201).send({score})
    }).catch((err) => {
        next(err)
    })
}