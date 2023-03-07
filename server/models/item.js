// item.js
const Sequelize = require('sequelize');
const {sequelize} = require('../db');

const Item = sequelize.define('Item', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.FLOAT,
    category: Sequelize.STRING,
    image: Sequelize.STRING,
  })


module.exports = {Item};

// Item.init({
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   price: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false
//   },
//   category: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   image: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: 'item'
// })

