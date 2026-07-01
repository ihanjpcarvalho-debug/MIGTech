const Fardamento = require("../models/Fardamento");
const Movimentacao = require("../models/Movimentacao");

exports.listar = async (req, res) => {
  try {
    const movimentacoes = await Movimentacao.findAll({
      include: [
        {
          model: Fardamento,
          as: "fardamento",
          attributes: ["id", "camisa", "short"],
        },
      ],
      order: [
        ["data", "DESC"],
        ["id", "DESC"],
      ],
    });

    const lista = movimentacoes.map((item) => item.get({ plain: true }));
    res.render("movimentacao/listar", { movimentacoes: lista });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao listar movimentações.");
  }
};

exports.novo = async (req, res) => {
  try {
    const fardamentos = await Fardamento.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });
    res.render("movimentacao/cadastrar", { fardamentos });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao carregar formulário de movimentação.");
  }
};

exports.salvar = async (req, res) => {
  try {
    await Movimentacao.create({
      tipo: req.body.tipo?.toString().trim() || "Entrada",
      quantidade: Number(req.body.quantidade || 1),
      data:
        req.body.data?.toString().trim() ||
        new Date().toISOString().slice(0, 10),
      observacao: req.body.observacao?.toString().trim() || "",
      fardamentoId: Number(req.body.fardamentoId),
    });

    res.redirect("/movimentacoes");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao cadastrar movimentação.");
  }
};

exports.editar = async (req, res) => {
  try {
    const movimentacao = await Movimentacao.findByPk(req.params.id);
    const fardamentos = await Fardamento.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });

    if (!movimentacao) {
      return res.redirect("/movimentacoes");
    }

    res.render("movimentacao/editar", {
      movimentacao: movimentacao.get({ plain: true }),
      fardamentos,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao carregar edição de movimentação.");
  }
};

exports.atualizar = async (req, res) => {
  try {
    await Movimentacao.update(
      {
        tipo: req.body.tipo?.toString().trim() || "Entrada",
        quantidade: Number(req.body.quantidade || 1),
        data:
          req.body.data?.toString().trim() ||
          new Date().toISOString().slice(0, 10),
        observacao: req.body.observacao?.toString().trim() || "",
        fardamentoId: Number(req.body.fardamentoId),
      },
      { where: { id: req.params.id } },
    );

    res.redirect("/movimentacoes");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao atualizar movimentação.");
  }
};

exports.excluir = async (req, res) => {
  try {
    await Movimentacao.destroy({ where: { id: req.params.id } });
    res.redirect("/movimentacoes");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao excluir movimentação.");
  }
};
