const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PostJobModel = (sequelize, DataTypes) => {
  const User = require("./userModel")(sequelize, DataTypes);

  const PostJob = sequelize.define("postJob", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    titleJob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    listJob: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    statusJob: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Rekrut",
    },
    tukang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    applyTukang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  PostJob.belongsTo(User, { foreignKey: "userId" });

  return PostJob;
};

module.exports = PostJobModel;
