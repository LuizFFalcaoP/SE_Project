const Sequelize = require('sequelize')
const database = require('./../database')

const User = database.define(
  'users',
  {
    userId: {
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
    minimalReceipt: {
        type: Sequelize.DECIMAL,
        defaultValue: 0.5,
        allowNull: false,
    },
    monthlyReceipt: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  },
)
module.exports = User