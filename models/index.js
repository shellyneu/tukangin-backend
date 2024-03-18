const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./userModel");
const TukangModel = require("./tukangModel");
const PostJobModel = require("./postJobModel");

const User = UserModel(sequelize, Sequelize);
const Tukang = TukangModel(sequelize, Sequelize);
const PostJob = PostJobModel(sequelize, Sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.PostJob = PostJob;
db.Tukang = Tukang;

module.exports = db;
