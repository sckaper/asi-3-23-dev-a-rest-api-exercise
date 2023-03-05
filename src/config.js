require("dotenv").config()

const config = {
  port: process.env.PORT,
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: process.env.DB_CONNECTION_USER,
      password: "5qQM*$10ZK##",
      database: process.env.DB_CONNECTION_DATABASE,
    },
    migrations: {
      directory: "./src/db/migrations",
      stub: "./src/db/migration.stub",
    },
  },
  security: {
    session: {
      jwt: {
        secret: process.env.SECURITY_SESSION_JWT_SECRET,
        expiresIn: "1 day",
      },
      password: {
        saltLen: 32,
        iterations: 25000,
        keyLen: 256,
        digest: "sha512",
      },
    },
  },
}

module.exports = config
