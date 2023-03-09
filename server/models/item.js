// item.js
const Sequelize = require('sequelize');
const {sequelize} = require('../db');

const Item = sequelize.define('Item', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.FLOAT,
    category: Sequelize.STRING,
    image: Sequelize.STRING,
  })


module.exports = {Item};
