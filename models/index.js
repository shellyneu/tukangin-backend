const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./userModel");
const TransactionModel = require("./transactionModel");

const User = UserModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Transaction = Transaction;

module.exports = db;
