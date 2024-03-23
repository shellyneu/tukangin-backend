const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserModel = require("./userModel");
const PostJobModel = require("./postJobModel");

const ReviewModel = (sequelize, DataTypes) => {
  const User = UserModel(sequelize, DataTypes);
  const PostJob = PostJobModel(sequelize, DataTypes);

  const Review = sequelize.define("review", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PostJob,
        key: "id",
      },
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });

  Review.belongsTo(User, { foreignKey: "userId" });
  Review.belongsTo(PostJob, { foreignKey: "jobId" });

  return Review;
};

module.exports = ReviewModel;
