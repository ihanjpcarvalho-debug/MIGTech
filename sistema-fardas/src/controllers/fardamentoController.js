const Categoria = require("../models/Categoria");
const Fardamento = require("../models/Fardamento");

exports.listar = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });
    const fardamentos = await Fardamento.findAll({
      include: [
        { model: Categoria, as: "categoria", attributes: ["id", "nome"] },
      ],
      order: [["id", "ASC"]],
    });

    const lista = fardamentos.map((item) => ({
      ...item.get({ plain: true }),
      categoriaNome: item.categoria?.nome || "Sem categoria",
    }));

    res.render("fardamento/listar", { fardamentos: lista, categorias });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao listar fardamentos.");
  }
};

exports.novo = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });
    res.render("fardamento/cadastrar", { categorias });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao carregar formulário de fardamento.");
  }
};

exports.salvar = async (req, res) => {
  try {
    await Fardamento.create({
      camisa: req.body.camisa?.toString().trim() || "",
      short: req.body.short?.toString().trim() || "",
      tamanho: req.body.tamanho?.toString().trim() || "P",
      quantidade: Number(req.body.quantidade || 0),
      entrega: req.body.entrega?.toString().trim() || "",
      categoriaId: req.body.categoriaId ? Number(req.body.categoriaId) : null,
    });

    res.redirect("/fardamentos");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao cadastrar fardamento.");
  }
};

exports.editar = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });
    const fardamento = await Fardamento.findByPk(req.params.id);

    if (!fardamento) {
      return res.redirect("/fardamentos");
    }

    res.render("fardamento/editar", {
      fardamento: fardamento.get({ plain: true }),
      categorias,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao carregar edição de fardamento.");
  }
};

exports.atualizar = async (req, res) => {
  try {
    await Fardamento.update(
      {
        camisa: req.body.camisa?.toString().trim() || "",
        short: req.body.short?.toString().trim() || "",
        tamanho: req.body.tamanho?.toString().trim() || "P",
        quantidade: Number(req.body.quantidade || 0),
        entrega: req.body.entrega?.toString().trim() || "",
        categoriaId: req.body.categoriaId ? Number(req.body.categoriaId) : null,
      },
      { where: { id: req.params.id } },
    );

    res.redirect("/fardamentos");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao atualizar fardamento.");
  }
};

exports.excluir = async (req, res) => {
  try {
    await Fardamento.destroy({ where: { id: req.params.id } });
    res.redirect("/fardamentos");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao excluir fardamento.");
  }
};
