const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/", usuarioController.listar);
router.get("/novo", usuarioController.formCadastrar);
router.post("/", usuarioController.criar);
router.get("/:id/editar", usuarioController.formEditar);
router.post("/:id", usuarioController.atualizar);
router.post("/:id/excluir", usuarioController.excluir);

module.exports = router;
