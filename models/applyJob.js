const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserModel = require("./userModel");

const ApplyJobModel = (sequelize, DataTypes) => {
  const Tukang = TukangModel(sequelize, DataTypes);
  const PostJob = PostJobModel(sequelize, DataTypes);
  const ApplyJob = sequelize.define("applyJob", {
    tukangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tukang,
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
    statusTerima: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });

  ApplyJob.belongsTo(Tukang, { foreignKey: "tukangId" });
  ApplyJob.belongsTo(PostJob, { foreignKey: "jobId" });

  ApplyJob.beforeCreate(async (applyJobInstance, options) => {
    const job = await PostJob.findByPk(tukangInstance.jobId);
    if (job) {
      applyJobInstance.titleJob = job.titleJob;
    }
  });

  return ApplyJob;
};

module.exports = ApplyJobModel;
