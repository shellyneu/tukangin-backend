const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ReviewModel = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: "UserId" });
  };

  return Review;
};

module.exports = ReviewModel;
