const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/categoriaController");

router.get("/", categoriaController.listar);

router.get("/nova", categoriaController.formCadastrar);

router.post("/", categoriaController.criar);

router.get("/:id/editar", categoriaController.formEditar);

router.post("/:id", categoriaController.atualizar);

router.post("/:id/excluir", categoriaController.excluir);

module.exports = router;
