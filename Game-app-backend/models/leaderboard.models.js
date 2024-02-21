const connection = require('../connection')
const mongoose = require('mongoose')

exports.retrieveLeaderboard  =  () => {

    connection.connect()

    const LeaderboardSchema = mongoose.Schema({
        username: String,
        score: Number 
    }, { collection: 'leaderboard' });
    
    const LeaderboardModel = mongoose.model("leaderboard", LeaderboardSchema)

    return LeaderboardModel.find().then((leaderboard) => {
        return leaderboard
    })

}

