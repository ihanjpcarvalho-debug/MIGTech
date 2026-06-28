const { DataTypes } = require("sequelize");
const sequelize = require("../config/bd");

const categoria = sequelize.define(
  "categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    situacao: {
      type: DataTypes.ENUM("Novo fardamento", "Substituição", "Troca"),
      defaultValue: "Novo fardamento",
    },
  },
  {
    tableName: "Categoria",
    timestamps: true,
  },
);

module.exports = categoria;
