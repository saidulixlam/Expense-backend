const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Expense = sequelize.define("Expense", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
