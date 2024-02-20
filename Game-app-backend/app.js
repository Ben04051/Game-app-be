const express = require('express')
const mongoose = require('mongoose')
const connection = require('./connection')
const {handleIncorrectPath} = require('./controllers/endpoint.controllers')
const cors = require('cors');

const app = express()

app.use(cors())

connection.connect()

const UserSchema = mongoose.Schema({
    username : String,
    password: String 
})

UserModel = mongoose.model("users", UserSchema)

const LeaderboardSchema = mongoose.Schema({
    username: String,
    score: Number 
}, { collection: 'leaderboard' });

const LeaderboardModel = mongoose.model("leaderboard", LeaderboardSchema);


app.get("/getUsers", (req, res) => {
    console.log(UserModel)
    UserModel.find().then((users) => {
        res.json(users)
    }).catch((err) => {
        console.log(err)
    })
})

app.get("/leaderboard", (req, res) => {
    LeaderboardModel.find()
        .then((leaderboard) => {
            res.json(leaderboard);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch leaderboard entries" });
        });
});

app.all('*', handleIncorrectPath)


app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({msg: err.msg})
    } else {
        next(err)
    }
})
app.use((err, req, res, next) => {
    res.status(500).send({msg: "developer error"})
})

module.exports= app
