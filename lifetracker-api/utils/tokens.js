const db = require("../db")
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../config')

// console.log("secret keyuyyuyyy", SECRET_KEY.SECRET_KEY)

const generateToken = (data) => jwt.sign((data), SECRET_KEY.SECRET_KEY, {expiresIn: "30d"})








const createUserJwt = (user) => {
    // validateFields({ required: ["id", "email"], obj: user, location: "token generation" })
    
    const payload = {
        id: user.id,
        email: user.email,
        password: user.password
    }
    
    return generateToken(payload) 
    
    
  }




  const validateToken = (token) => {

    try {
      let verified = jwt.verify(token, SECRET_KEY)

      if (verified) {
        let decoded = jwt.decode(token)
        return decoded
      }

    } catch (err) {
      return {err: "invalid token"}
    }
  }



  module.exports = {
    generateToken,
    validateToken,
    createUserJwt,
  }
