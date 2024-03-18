const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./userModel");
const TukangModel = require("./tukangModel");

const User = UserModel(sequelize, Sequelize);
const Tukang = TukangModel(sequelize, Sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Tukang = Tukang;

module.exports = db;
