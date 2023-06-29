"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require('../utils/errors')

const { BCRYPT_WORK_FACTOR } = require("../config")
const { validateFields } = require("../utils/validate")






class User {

  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */


  static showUser(user) {
    return {
        id: user.id,
        username: user.username,
        first_name: user.first_name, 
        last_name: user.last_name,
        email: user.email,     
        created_at: user.created_at
    }
  }







  /**
   * "The Login method"
   * 
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user 
   **/


  static async login(creds) {
    const {email, password} = creds
    const requiredCreds = ["email", "password"]

    //making sure the user enters both email and password using validateFields function
    try {
        validateFields({required: requiredCreds, obj: creds, location: "user login"})
    } catch (error) {
        throw error
    }



    const user = await User.getUserByEmail(email)

    if(user){
        // compare the hash password to the normal password
        const isValid = await bcrypt.compare(password, user.password)


        // dont think you have to specify exaclt that isValid === true but idk
       if (isValid) {
        return User.showUser(user)
       }
    }


    throw new UnauthorizedError("invalid password/email")
  }

























}