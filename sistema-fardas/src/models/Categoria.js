const { DataTypes } = require("sequelize");
const sequelize = require("../config/bd");

const Categoria = sequelize.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Categoria",
    timestamps: true,
  },
);

module.exports = Categoria;
