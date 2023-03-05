export const up = async (knex) => {
  await knex.schema
    .createTable("roles", (table) => {
      table.increments("id")
      table.text("name").notNullable()
    })
    .createTable("users", (table) => {
      table.increments("id")
      table.text("firstName").notNullable()
      table.text("lastName").notNullable()
      table.string("email").unique().notNullable()
      table.integer("role").unsigned()
      table.foreign("role").references("id").inTable("roles").onDelete("")
    })
    .createTable("pages", (table) => {
      table.increments("id")
      table.text("title").notNullable()
      table.text("content").notNullable()
      table.text("urlSlug").notNullable()
      table.timestamp("created_at").defaultTo(knex.fn.now())
      table.boolean("status").defaultTo(false)
      table.integer("creator").unsigned().notNullable()
      table.foreign("creator").references("id").inTable("users").onDelete("")
      table.integer("last_modify_by").unsigned().notNullable()
      table
        .foreign("last_modify_by")
        .references("id")
        .inTable("users")
        .onDelete("")
    })
    .createTable("navigationMenus", (table) => {
      table.increments("id")
      table.string("name").notNullable().unique()
    })
}

export const down = async (knex) => {
  await knex.schema
    .dropTable("pages")
    .dropTable("navigationMenus")
    .dropTable("users")
    .dropTable("roles")
}
