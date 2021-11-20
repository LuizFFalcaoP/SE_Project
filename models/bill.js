const Sequelize = require('sequelize')
const database = require('./../database')

const Bill = database.define(
  'bills',
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
    dueDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    category: {
      type: Sequelize.ENUM(
        'educação',
        'saúde',
        'alimentação',
        'veículo',
        'contas',
        'aluguel',
        'condomínio',
        'cartão',
        'outros',
      ),
      allowNull: false,
    },
    costId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isPayed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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

module.exports = Bill
