const express = require("express");
const cors = require("cors");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const categoriaRoutes = require("./routes/categoriaRoutes");
const fardamentoRoutes = require("./routes/fardamentoRoutes");
const movimentacaoRoutes = require("./routes/movimentacaoRoutes");

app.use("/categorias", categoriaRoutes);
app.use("/fardamentos", fardamentoRoutes);
app.use("/movimentacoes", movimentacaoRoutes);

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    extname: ".handlebars",
    helpers: {
      eq: (a, b) => a === b,
    },
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

module.exports = app;
