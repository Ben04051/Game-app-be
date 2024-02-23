const express = require('express')
const mongoose = require('mongoose')
const connection = require('./connection')
const {handleIncorrectPath} = require('./controllers/endpoint.controllers')
const cors = require('cors');
const { getLeaderboard, getLeaderboardByUsername, postScoreToLeaderbord } = require('./controllers/leaderboard.controllers');
const { getAllUsers, getUser, addUser, deleteUser } = require('./controllers/users.controllers');

const app = express()

app.use(cors())

app.use(express.json())

app.get("/users", getAllUsers)

app.get("/users/:username", getUser)

app.post("/users", addUser)

app.delete("/users/:username", deleteUser)

app.get("/leaderboard", getLeaderboard)

app.get("/leaderboard/:username", getLeaderboardByUsername)

app.post("/leaderboard", postScoreToLeaderbord)

app.all('*', handleIncorrectPath)

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({msg: err.msg})
    } else {
        next(err)
    }
})
app.use((err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({msg: "Bad request"})
    } else {
        next(err)
    }
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: "developer error"})
})

module.exports= app
