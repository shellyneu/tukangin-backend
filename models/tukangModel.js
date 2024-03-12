const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TukangModel = (sequelize, DataTypes) => {
  const Tukang = sequelize.define("tukang", {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noHP: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{9,13}$/,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ktp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusValidate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return Tukang;
};

module.exports = TukangModel;
