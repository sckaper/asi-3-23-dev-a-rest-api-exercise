const BaseModel = require("./BaseModel.cjs")
const UserModel = require("./UserModel.cjs")

class PageModel extends BaseModel {
  static tableName = "pages"

  static get relationMappings() {
    return { 
      creator: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
      },
      last_modify_by: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
      }
    }
  }
}

module.exports = PageModel