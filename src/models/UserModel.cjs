const BaseModel = require("./BaseModel.cjs")
const RoleModel = require("./RoleModel.cjs")
const PageModel = require("./PageModel.cjs")

class UserModel extends BaseModel {
  static tableName = "users"

  static get relationMappings() {
    return {
      roles: {
        modelClass: RoleModel,
        relation: BaseModel.BelongsToOneRelation,
      },
      pages: {
        modelClass: PageModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "users.id",
          to: "pages.creator",
        },
      }
    }
  }
}

module.exports = UserModel
