const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./userModel");
const TransactionModel = require("./transactionModel");
const TukangModel = require("./tukangModel");
const PostJobModel = require("./postJobModel");

const User = UserModel(sequelize, Sequelize);
const Tukang = TukangModel(sequelize, Sequelize);
const PostJob = PostJobModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Transaction = Transaction;
db.PostJob = PostJob;
db.Tukang = Tukang;

module.exports = db;
