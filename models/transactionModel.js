const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserModel = require("./userModel");
const TukangModel = require("./tukangModel");
const PostJobModel = require("./postJobModel");

const TransactionModel = (sequelize, DataTypes) => {
  const User = UserModel(sequelize, DataTypes);
  const Tukang = TukangModel(sequelize, DataTypes);
  const PostJob = PostJobModel(sequelize, DataTypes);

  const Transaction = sequelize.define("transaction", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    tukangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PostJob,
        key: "id",
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_total: {
      type: DataTypes.INTEGER,
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
      allowNull: true,
      defaultValue: "Pengajuan",
    },
    action: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

  Transaction.belongsTo(User, { foreignKey: "userId" });
  Transaction.belongsTo(PostJob, { foreignKey: "jobId" });

  Transaction.beforeCreate(async (transactionInstance, options) => {
    const job = await PostJob.findByPk(transactionInstance.jobId);
    if (job) {
      transactionInstance.price = job.price;
    }
  });

  return Transaction;
};

module.exports = TransactionModel;
