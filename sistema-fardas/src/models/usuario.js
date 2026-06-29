const { DataTypes } = require("sequelize");
const sequelize = require("../config/bd");
const Categoria = require("./Categoria");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    perfil: {
      type: DataTypes.ENUM("Administrador", "Funcionário"),
      allowNull: false,
      defaultValue: "Funcionário",
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
    tableName: "Usuario",
    timestamps: true,
  },
);

Usuario.belongsTo(Categoria, { foreignKey: "categoriaId", as: "categoria" });
Categoria.hasMany(Usuario, { foreignKey: "categoriaId", as: "usuarios" });

module.exports = Usuario;
