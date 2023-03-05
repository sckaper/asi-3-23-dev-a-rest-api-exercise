const hashPassword = require("../hashPassword.js")
const config = require("../config.js")
const jsonwebtoken = require("jsonwebtoken")

const routeSign = ({ app, db }) => {
  app.post("/sign-in", async (req, res) => {
    const { email, password } = req.body
    const [user] = await db("users").where({ email })

    if (!user) {
      res.status(401).send({ error: "connection non authorisée" })
    }

    const [passwordHash] = hashPassword(password, user.passwordSalt)

    if (user.passwordHash !== passwordHash) {
      res.status(401).send({ error: "connection non authorisée" })
    }

    const jwt = jsonwebtoken.sign(
      {
        payload: {
          user: {
            id: user.id,
            fullName: `${user.firstName} ${user.lastName}`,
            role: `${user.role}`,
            email: `${user.email}`
          },
        },
      },
      config.security.session.jwt.secret,
      { expiresIn: config.security.session.jwt.expiresIn }
    )

    res.send({ result: jwt })
  })
}

module.exports = routeSign
