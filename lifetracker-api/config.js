


"use strict"

require("dotenv").config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const IS_TESTING = process.env.NODE_ENV === "test"


function getDatabaseUri () {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "lifetracker"

    //if the DATABASE_URL environment variable is provided, use that
    //otherwise create our own db connection string

    return process.env.DATABASE_URL || `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}


const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13





console.log("Lifetracker Hub Config:")
console.log("BCRYPT_WORK_FACTOR", BCRYPT_WORK_FACTOR)
console.log("PORT:", PORT)
console.log("---")

module.exports = {
  PORT,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR
}