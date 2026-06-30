const Categoria = require("./Categoria");
const Fardamento = require("./Fardamento");

Categoria.hasMany(Fardamento, {
  foreignKey: "categoriaId",
  as: "fardamentos",
});

Fardamento.belongsTo(Categoria, {
  foreignKey: "categoriaId",
  as: "categoria",
});

module.exports = {
  Categoria,
  Fardamento,
};
