const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TransactionModel = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("transaction", {
    tukang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bukti: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pengajuan",
    },
    action: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

  return Transaction;
};

module.exports = TransactionModel;
