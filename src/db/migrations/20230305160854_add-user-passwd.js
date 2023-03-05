exports.up = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.text("passwordHash")
    table.text("passwordSalt")
  })
}

exports.down = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumns("passwordHash", "passwordSalt")
  })
}
