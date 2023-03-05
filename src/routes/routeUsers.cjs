const auth = require("../middlewares/auth.js")
const sanitizeUser = require("../sanitizers.js")
const UserModel = require("../models/UserModel.cjs")

const routeUsers = async ({ app, db }) => {
  const checkUser = async (res, userId) => {
    const user = await db("users").where({ id: userId })

    if (!user) {
      return true
    }

    return false
  }

  app.get("/users", auth, async (req, res) => {
    const sessionUser = req.session

    if (sessionUser.user.role === "1") {
      res.send({ result: sanitizeUser(await db("users")) })

      return
    }

    res.send({
      result: sanitizeUser(
        await db("users").where({ id: sessionUser.user.id })
      ),
    })
  })

  app.get("/users/:id", auth, async (req, res) => {
    const { id } = req.params
    const sessionUser = req.session

    if (checkUser(res, id)) {
      res.status(404).send({error: "not found"})
    }


    if (
      sessionUser.user.id.toString() !== id &&
      sessionUser.user.role !== "1"
    ) {
      res.status(404).send({ error: "not found" })

      return
    }

    res.send({ result: sanitizeUser(await db("users").where({ id: id })) })
  })

  app.post("/users", auth, async (req, res) => {
    const { firstName, lastName, email } = req.body
    const sessionUser = req.session

    if (sessionUser.user.role !== 1) {
      res.status(403).send({ error: "forbidden" })

      return
    }

    const [user] = await db("users").insert({ firstName, lastName, email })
    res.send({ id: user, firstName, lastName, email })
  })

  app.patch("/users/:id", auth, async (req, res) => {
    const { id } = req.params
    const sessionUser = req.session
    const { firstName, lastName, email } = req.body

    if (
      sessionUser.user.id.toString() !== id &&
      sessionUser.user.role !== "1"
    ) {
      res.status(403).send({ error: "forbidden" })

      return
    }

    if (checkUser(res, id)) {
      res.status(404).send({error: "not found"})
    }


    const updateUser = await db("users")
      .update({ firstName, lastName, email })
      .where({ id: id })
    res.send({ id: updateUser, firstName, lastName, email })
  })

  app.delete("/users/:id", auth, async (req, res) => {
    const { id } = req.params
    const sessionUser = req.session
    const [user] = await db("users").where({ id: id })

    if (checkUser(res, id)) {
      res.status(404).send({error: "not found"})
    }

    if (sessionUser.user.role !== "1") {
      res.status(403).send({ error: "forbidden" })

      return
    }

    res.send({ result: user })
    await db("users").delete().where({ id: id })
  })
}

module.exports = routeUsers
