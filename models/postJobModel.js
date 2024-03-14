const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PostJobModel = (sequelize, DataTypes) => {
  const PostJob = sequelize.define("postJob", {
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

  return PostJob;
};

module.exports = PostJobModel;
