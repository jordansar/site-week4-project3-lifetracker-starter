"use strict"

/** Routes for authentication. */

const express = require("express")
const User = require("../models/user")
const security = require("../middleware/security")
const router = express.Router()
router.use(express.json())


// make a post for this
router.get("/me", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const { email } = res.locals.user
    const user = await User.fetchUserByEmail(email)
    return res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
})



router.post("/sleep", async function (req, res, next) {
  try {
    // const something = await User.fetchUserByEmail(email)
    const user = await User.sleep(req.body)
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})


router.post("/getSleep", async function (req, res, next) {
  try {

    // console.log("id in here?" ,req.body)
    const userSleeps = await User.getSleep(req.body.id)
    console.log("sleeps to return" , {userSleeps})
    return res.status(200).json(userSleeps)
  } catch (error) {
    next(error)
  }
})







router.post("/login", async function (req, res, next) {
  try {
    console.log("putting in ", req.body)
    const user = await User.login(req.body)
    console.log("user ", user)
    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})




router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})





module.exports = router