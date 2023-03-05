const { pbkdf2Sync, randomBytes } = require("node:crypto")
const config = require("./config.js")

const security = config.security.session.password

const hashPassword = (
  password,
  salt = randomBytes(security.saltLen).toString("hex")
) => [
  pbkdf2Sync(
    password,
    salt,
    security.iterations,
    security.keyLen,
    security.digest
  ).toString("hex"),
  salt,
]

module.exports = hashPassword
