"use strict"

const db = require("../../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require('../utils/errors')

const { BCRYPT_WORK_FACTOR } = require("../config")
const { validateFields } = require("../utils/validate")
const {  createUserJwt } = require("../utils/tokens")






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
        first_name: user.firstName, 
        last_name: user.lastName,
        email: user.email,     
        created_at: user.created_at,
        token: user.token
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

    // making sure the user enters both email and password using validateFields function
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
        let token = createUserJwt(user)
        user.token = token
        console.log("token in backend? ", user)
        return (User.showUser(user) )
       }
    }


    throw new UnauthorizedError("invalid password/email")
  }





    /**
     * The register method
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/


    static async register(creds) {
        const {username, password, firstName, lastName, email} = creds
        const requiredCreds = ["username", "password", "firstName", "lastName", "email"]
        
        try {
            validateFields({required: requiredCreds, obj: creds, location: "user registration"})
        } catch (error) {
            throw(error)
        }


        const existingUserEmail = await User.getUserByEmail(email)
        

        if (existingUserEmail) {
            throw new BadRequestError(`Duplicate email for: ${email} ` )
        }


    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()

    
    const result = await db.query(
      `INSERT INTO users (
          username,
          password,
          first_name,
          last_name,
          email
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING username,
                  first_name AS "firstName",            
                  last_name AS "lastName", 
                  email
                  `,
                  [username, hashedPassword, firstName, lastName, normalizedEmail]
                  )
                  
                  const user = result.rows[0]
                  
                  return user
                }
                
                
                
                
/**
* The Sleep Activity method
 * Makes the user sleep infomration
 * 
*/

static async sleep(info)
{
  const {sleeptime, waketime} = info
  const requiredInfo = ["sleeptime", "waketime"]
  

  try {
    validateFields({required: requiredInfo, obj: info, location: "sleep input "})
} catch (error) {
    throw(error)
}


const result = await db.query(
  `INSERT INTO sleep (
    sleeptime,
    waketime
  )
  VALUES ($1, $2)
  RETURNING sleeptime,
  waketime`,
  [sleeptime, waketime]
)

const user = result.rows[0]

return user;

}


static async getSleep(id){

const result = await db.query(
  `SELECT sleeptime, waketime FROM sleep WHERE id=$1`,
  [id]
)

const sleeps = result.rows

return sleeps;

}













      /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */


  static async getUserByEmail(email) {
    console.log("email: ",email)
    const result = await db.query(
      `SELECT 
              id,
              username,
              email, 
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              created_at,
              updated_at              
           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    )
    
    const user = result.rows[0]
    
    return user
  }

















}


module.exports = User