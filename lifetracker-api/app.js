const express = require("express")
const config = require("./config")
const authRoutes = require("./routes/auth")
const cors = require("cors")
// const db = require("../db")



const app = express()
app.use(express.json())
app.use(cors())



app.use("/auth", authRoutes)



app.get('/', (req, res) => {
    res.send({ping: "blue"})
})





module.exports= app