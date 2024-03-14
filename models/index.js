const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./userModel");
const PostJobModel = require("./postJobModel");

const User = UserModel(sequelize, Sequelize);
const PostJob = PostJobModel(sequelize, Sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.PostJob = PostJob;

module.exports = db;
