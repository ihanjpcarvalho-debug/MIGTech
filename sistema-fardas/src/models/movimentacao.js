const { DataTypes } = require("sequelize");
const sequelize = require("../config/bd");
const Fardamento = require("./Fardamento");

const Movimentacao = sequelize.define(
  "Movimentacao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.ENUM("Entrada", "Saída"),
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    observacao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fardamentoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Fardamento,
        key: "id",
      },
    },
  },
  {
    tableName: "Movimentacao",
    timestamps: true,
  },
);

Movimentacao.belongsTo(Fardamento, {
  foreignKey: "fardamentoId",
  as: "fardamento",
});
Fardamento.hasMany(Movimentacao, {
  foreignKey: "fardamentoId",
  as: "movimentacoes",
});

module.exports = Movimentacao;
