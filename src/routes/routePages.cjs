const auth = require("../middlewares/auth.js")

const routePages = async ({ app, db }) => {
  app.get("/pages", async (req, res) => {
    res.send({ result: await db("pages") })
  })

  app.get("/pages/:id", async (req, res) => {
    const { id } = req.params
    const [page] = await db("pages").where({ id: id })

    if (!page) {
      res.status(404).send({ error: "not found" })

      return
    }

    res.send({ result: await db("pages").where({ id: id }) })
  })

  app.post("/pages", auth, async (req, res) => {
    const sessionUser = req.session
    const { title, content, urlSlug } = req.body

    if (sessionUser.user.role !== "1" || sessionUser.user.role !== "2") {
      res.status(403).send({ error: "forbidden" })

      return
    }

    const [page] = await db("pages").insert({ title, content, urlSlug })
    res.send({ id: page, title, content, urlSlug })
  })

  app.patch("/pages/:id", auth, async (req, res) => {
    const { id } = req.params
    const { title, content, urlSlug } = req.body
    const [pages] = await db("pages").where({ id: id })

    if (!pages) {
      res.status(404).send({ error: "not found" })

      return
    }

    const updatePage = await db("pages")
      .update({ title, content, urlSlug })
      .where({ id: id })
    res.send({ id: updatePage, title, content, urlSlug })
  })

  app.delete("/pages/:id", auth, async (req, res) => {
    const { id } = req.params
    const sessionUser = req.session

    const [page] = await db("pages").where({ id: id })

    if (!page) {
      res.status(404).send({ error: "not found" })

      return
    }

    if (sessionUser.user.role !== "1" || sessionUser.user.role !== "2") {
      res.status(403).send({ error: "forbidden" })

      return
    }

    res.send({ result: page })
    await db("pages").delete().where({ id: id })
  })
}

module.exports = routePages
