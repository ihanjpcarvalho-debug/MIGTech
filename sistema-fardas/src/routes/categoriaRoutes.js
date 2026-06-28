const express = require("express");

const router = express.Router();

const categoriaController = require("../controllers/categoriaController");

// Listar

router.get("/", categoriaController.listar);

// Formulário

router.get("/nova", categoriaController.formCadastrar);

// Criar

router.post("/", categoriaController.criar);

// Editar

router.get("/:id/editar", categoriaController.formEditar);

// Atualizar

router.post("/:id", categoriaController.atualizar);

// Excluir

router.post("/:id/excluir", categoriaController.excluir);

module.exports = router;
