//unir as coisas tudo, aqui ja tem umas coisinhas prontas :p

const Categoria = require("./Categoria");
const Fardamento = require("./Fardamento");

// Categoria possui vários fardamentos
Categoria.hasMany(Fardamento, {
  foreignKey: "categoria_id",
});

// Cada fardamento pertence a uma categoria
Fardamento.belongsTo(Categoria, {
  foreignKey: "categoria_id",
});

module.exports = {
  Categoria,
  Fardamento,
};
