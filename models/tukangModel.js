const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserModel = require("./userModel");

const TukangModel = (sequelize, DataTypes) => {
  const User = UserModel(sequelize, DataTypes);
  const Tukang = sequelize.define("tukang", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ktp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    statusValidate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  });

  Tukang.belongsTo(User, { foreignKey: "userId" });

  Tukang.beforeCreate(async (tukangInstance, options) => {
    const user = await User.findByPk(tukangInstance.userId);
    if (user) {
      tukangInstance.nama = user.nama;
      tukangInstance.noHP = user.noHP;
      tukangInstance.email = user.email;
      tukangInstance.password = user.password;
    }
  });

  return Tukang;
};

module.exports = TukangModel;
