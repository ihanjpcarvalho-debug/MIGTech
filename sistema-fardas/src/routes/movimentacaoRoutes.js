const express = require("express");
const router = express.Router();
const movimentacaoController = require("../controllers/movimentacaoController");

router.get("/", movimentacaoController.listar);
router.get("/novo", movimentacaoController.novo);
router.post("/", movimentacaoController.salvar);
router.get("/:id/editar", movimentacaoController.editar);
router.post("/:id", movimentacaoController.atualizar);
router.post("/:id/excluir", movimentacaoController.excluir);

module.exports = router;
