const routeNavigationMenus = async ({ app, db }) => {
  app.get("/navigation-menus", async (req, res) => {
    res.send({ result: await db("navigationmenus") })
  })

  app.get("/navigation-menus/:id", async (req, res) => {
    const { id } = req.params
    const [navigationmenu] = await db("navigationmenus").where({ id: id })

    if (!navigationmenu) {
      res.status(404).send({ error: "not found" })

      return
    }

    res.send({ result: await db("navigationmenus").where({ id: id }) })
  })

  app.post("/navigation-menus", async (req, res) => {
    const { title, content, urlSlug } = req.body
    const [user] = await db("users").insert({ title, content, urlSlug })
    res.send({ id: user, title, content, urlSlug })
  })

  app.patch("/navigation-menus/:id", async (req, res) => {
    const { id } = req.params
    const { title, content, urlSlug } = req.body
    const [navigationmenus] = await db("navigationmenus").where({ id: id })

    if (!navigationmenus) {
      res.status(404).send({ error: "not found" })

      return
    }

    const updateNavigationMenu = await db("users")
      .update({ title, content, urlSlug })
      .where({ id: id })
    res.send({ id: updateNavigationMenu, title, content, urlSlug })
  })

  app.delete("/navigation-menus/:id", async (req, res) => {
    const { id } = req.params
    const [navigationmenu] = await db("navigationmenus").where({ id: id })

    if (!navigationmenu) {
      res.status(404).send({ error: "not found" })

      return
    }

    await db("navigationmenus").delete().where({ id: id })
    res.send({ result: navigationmenu })
  })
}

module.exports = routeNavigationMenus
