const config = require("../config.js")
const jsonwebtoken = require("jsonwebtoken")


const auth = (req, res, next) => {
  const { authorization } = req.headers
  
  if (!authorization) {
    res.status(403).send({ error: "forbidden" })

    return
  }

  try {
    const { payload } = jsonwebtoken.verify(
      authorization.slice(7),
      config.security.session.jwt.secret
    )
    req.session = payload
  } catch (err) {
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      res.status(401).send({ error: "connection non authorisée" })
    }

    throw err
  }
  
  next()
}

module.exports = auth