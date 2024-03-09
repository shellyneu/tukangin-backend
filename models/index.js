const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const UserModel = require("./userModel");
const ReviewModel = require("./reviewModel");

const User = UserModel(sequelize, Sequelize);
const Review = ReviewModel(sequelize, Sequelize);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Review = Review;

module.exports = db;
