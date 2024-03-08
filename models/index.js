const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./userModel");

const User = UserModel(sequelize, Sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;

module.exports = db;
