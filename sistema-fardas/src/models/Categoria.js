const { DataTypes } = require("sequelize");
const sequelize = require("../config/bd");

const Categoria = sequelize.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true,
    },

    nome: {
      type: DataTypes.STRING(40),

      allowNull: false,

      unique: true,
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ativa: {
      type: DataTypes.BOOLEAN,

      defaultValue: true,
    },
  },
  {
    tableName: "Categoria",

    timestamps: true,
  },
);

module.exports = Categoria;
