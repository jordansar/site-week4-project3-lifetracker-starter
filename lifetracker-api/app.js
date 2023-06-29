const express = require("express")
const config = require("./config")
// const db = require("../db")


const app = express()
















app.get('/', (req, res) => {
    res.send({ping: "pong"})
})





module.exports= app