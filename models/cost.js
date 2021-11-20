const Sequelize = require('sequelize')
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
        'Custos gerais'
      ),
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
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

module.exports = Cost
