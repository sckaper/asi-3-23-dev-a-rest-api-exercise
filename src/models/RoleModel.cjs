const BaseModel = require("./BaseModel.cjs")
const UserModel = require("./UserModel.cjs")

class RoleModel extends BaseModel {
  static tableName = "roles"

  static get relationMappings() {
    return {
      users: {
        modelClass: UserModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "roles.id",
          to: "users.role",
        },
      }
    }
  }
}

module.exports = RoleModel