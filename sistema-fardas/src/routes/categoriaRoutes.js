const express = require("express");
console.log("categoriaController carregado");
const router = express.Router();

const categoriaController = require("../controllers/categoriaController");

// Listar todas as categorias
router.get("/", categoriaController.listar);

// Abrir formulário de cadastro
router.get("/nova", categoriaController.formCadastrar);

// Salvar nova categoria
router.post("/", categoriaController.criar);

// Abrir formulário de edição
router.get("/:id/editar", categoriaController.formEditar);

// Atualizar categoria
router.post("/:id", categoriaController.atualizar);

// Excluir categoria
router.post("/:id/excluir", categoriaController.excluir);

module.exports = router;
