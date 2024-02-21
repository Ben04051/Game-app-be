const express = require('express')
const mongoose = require('mongoose')
const connection = require('./connection')
const {handleIncorrectPath} = require('./controllers/endpoint.controllers')
const cors = require('cors');
const { getLeaderboard } = require('./controllers/leaderboard.controllers');
const { getAllUsers } = require('./controllers/users.controllers');

const app = express()

app.use(cors())

app.get("/getUsers", getAllUsers)

app.get("/leaderboard", getLeaderboard)

app.all('*', handleIncorrectPath)


app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({msg: err.msg})
    } else {
        next(err)
    }
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg: "developer error"})
})

module.exports= app
