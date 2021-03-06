const { Sequelize, DataTypes } = require('sequelize')
const database = require('../database')

const Cost = database.define(
  'costs',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    label: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM('receita', 'despesa'),
      allowNull: false,
    },
    category: {
      type: Sequelize.ENUM(
        'Cartão de crédito',
        'Imóveis e aluguéis',
        'Custos gerais',
      ),
      allowNull: false,
    },
    userid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  },
)

module.exports = Cost
