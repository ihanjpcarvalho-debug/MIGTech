const app = require("./app");
const sequelize = require("./config/bd");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Banco conectado!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err);
  });
