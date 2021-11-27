const Sequelize = require("sequelize");
const database = require("./../database");

const User = database.define(
  "users",
  {
    userid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    minimalreceipt: {
      type: Sequelize.DECIMAL,
      defaultValue: 0.5,
      allowNull: false,
    },
    monthlyreceipt: {
      type: Sequelize.DECIMAL,
      defaultValue: 0,
      allowNull: false,
    },
    receiptpercenttoschool: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
    receiptpercenttotravel: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
    receiptpercenttoschoolarshipmaterial: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
    receiptpercenttogeneral: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
    increasegoal: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
    decreasegoal: {
      type: Sequelize.DECIMAL,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  }
);
module.exports = User;
