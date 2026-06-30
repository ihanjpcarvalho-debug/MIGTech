const { DataTypes } = require("sequelize");
const sequelize = require("../config/bd");
const Categoria = require("./Categoria");

const Fardamento = sequelize.define(
  "Fardamento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    camisa: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    short: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tamanho: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "P",
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    entrega: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Categoria,
        key: "id",
      },
    },
  },
  {
    tableName: "Fardamento",
    timestamps: true,
  },
);

Fardamento.belongsTo(Categoria, { foreignKey: "categoriaId", as: "categoria" });
Categoria.hasMany(Fardamento, { foreignKey: "categoriaId", as: "fardamentos" });

module.exports = Fardamento;
