const app = require("./app");
const sequelize = require("./config/bd");
require("dotenv").config();

require("./models/usuario");
require("./models/Categoria");
require("./models/Fardamento");
require("./models/Movimentacao");

const Categoria = require("./models/Categoria");

const PORT = process.env.PORT || 3000;

const garantirCategoriasPadrao = async () => {
  const total = await Categoria.count();
  if (total === 0) {
    await Categoria.bulkCreate([
      { nome: "Normal" },
      { nome: "Educação Física" },
    ]);
  }
};

const iniciarServidor = () => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

sequelize
  .authenticate()
  .then(() => sequelize.sync({ alter: true }))
  .then(() => garantirCategoriasPadrao())
  .then(() => {
    console.log("Banco conectado!");
    iniciarServidor();
  })
  .catch((err) => {
    console.warn(
      "Banco indisponível. Usuários e categorias podem não persistir até o banco voltar.",
    );
    console.warn(err.message);
    iniciarServidor();
  });
