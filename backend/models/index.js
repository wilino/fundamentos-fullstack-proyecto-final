'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require("dotenv").config();

const db = {};

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario para Render
    },
  },
});

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;