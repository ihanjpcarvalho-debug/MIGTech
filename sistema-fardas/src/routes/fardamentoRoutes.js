const express = require("express");
const router = express.Router();
const fardamentoController = require("../controllers/fardamentoController");

router.get("/", fardamentoController.listar);
router.get("/novo", fardamentoController.novo);
router.post("/", fardamentoController.salvar);
router.get("/:id/editar", fardamentoController.editar);
router.post("/:id", fardamentoController.atualizar);
router.post("/:id/excluir", fardamentoController.excluir);

module.exports = router;
