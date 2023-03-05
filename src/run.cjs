const express = require("express")
const cors = require("cors")
const knex = require("knex")
const BaseModel = require("./models/BaseModel.cjs")
const routeUsers = require("./routes/routeUsers.cjs")
const routePages = require("./routes/routePages.cjs")
const routeNavigationMenus = require("./routes/routeNavigationMenus.cjs")
const routeSign = require("./routes/routeSign.cjs")
const morgan = require("morgan")

const run = async (config) => {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(morgan("dev"))
  const db = knex(config.db)
  BaseModel.knex(db)

  routeUsers({ app, db })
  routePages({ app, db })
  routeNavigationMenus({ app, db })
  routeSign({ app, db })

  app.listen(config.port, () => console.log(`lisen on port ${config.port}`))
}

module.exports = run
