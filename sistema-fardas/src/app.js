//Nao mexam na pagina, so se for pra configurar a rota de vcs!!!

const express = require("express");
const cors = require("cors");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const categoriaRoutes = require("./routes/categoriaRoutes");
app.use("/categorias", categoriaRoutes);

// Receber dados de formulários
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.set("views", path.join(__dirname, "views"));

// CSS
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

module.exports = app;
