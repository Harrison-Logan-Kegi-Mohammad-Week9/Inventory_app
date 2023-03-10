const {Item} = require('./item')
const {User} = require('./user')
const {sequelize} = require('../db')

Item.belongsTo(User)
User.hasMany(Item)

module.exports = {
  Item,
  User,
  db: sequelize
}
