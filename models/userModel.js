const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        len: [16],
      },
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
      allowNull: true,
    },
    statusValidate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return User;
};

module.exports = UserModel;
