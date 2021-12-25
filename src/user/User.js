const { Model, DataTypes } = require("sequelize");
const Article = require("../article/Article");
const sequelize = require("../config/database");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "user", timestamps: false }
);

// Article.belongsTo(User, { as: "users_s", foreignKey: "userId" });
Article.belongsTo(User, { as: "user" });
User.hasMany(Article, { foreignKey: "userId" });

module.exports = User;
