const connection = require('../connection')
const mongoose = require('mongoose')

const LeaderboardSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, { collection: 'leaderboard' });

let LeaderboardModel;

const getLeaderboardModel = () => {
    if (!LeaderboardModel) {
        LeaderboardModel = mongoose.model("leaderboard", LeaderboardSchema);
    }
    return LeaderboardModel;
}

exports.retrieveLeaderboard  =  (limit, p) => {
    if(limit === undefined) limit = 10;
    if(p === undefined) p = 1;
    if (!/^[1-9]\d*$/.test(limit) || !/^[1-9]\d*$/.test(p)){
        return Promise.reject({status: 400, msg: "400: Bad Request"})
    }
    connection.connect()
    const model = getLeaderboardModel()
    return model.find()
    .sort({score: -1})
    .skip((p - 1) * limit)
    .limit(limit)
    .then((leaderboard) => {
        if(leaderboard.length === 0){
            return Promise.reject({status: 404, msg: "404: results not found"})
        }
        return leaderboard
    })

}

exports.retrieveLeaderboardByUsername = (username, limit, p) => {
    if(limit === undefined) limit = 10;
    if(p === undefined) p = 1;
    if (!/^[1-9]\d*$/.test(limit) || !/^[1-9]\d*$/.test(p)){
        return Promise.reject({status: 400, msg: "400: Bad Request"})
    }
    connection.connect()
    const model = getLeaderboardModel()
    return model.find({username: username})
    .sort({score: -1})
    .skip((p - 1) * limit)
    .limit(limit)
    .then((leaderboard) => {
        if(leaderboard.length === 0){
            return Promise.reject({status: 404, msg: "404: results not found"})
        }
        return leaderboard
    })

}

exports.addScoreToLeaderboard = (username, score) => {
    if(typeof username !== "string" || typeof score !== "number") {
        return Promise.reject({status: 400, msg: "Bad Request"})
    }
    connection.connect()
    const model = getLeaderboardModel()
    return model.create({username, score}).then((score) => {
        return score
    })
}

