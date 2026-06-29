const Categoria = require("../models/Categoria");

exports.listar = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });

    res.render("categoria/listar", { categorias });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao listar categorias.");
  }
};

exports.formCadastrar = (req, res) => {
  res.render("categoria/cadastrar");
};

exports.criar = async (req, res) => {
  try {
    const nome = req.body.nome?.toString().trim();

    if (!nome) {
      return res.redirect("/categorias/nova");
    }

    await Categoria.create({ nome });
    res.redirect("/categorias");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao cadastrar categoria.");
  }
};

exports.formEditar = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id, { raw: true });

    if (!categoria) {
      return res.redirect("/categorias");
    }

    res.render("categoria/editar", { categoria });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao abrir edição.");
  }
};

exports.atualizar = async (req, res) => {
  try {
    const nome = req.body.nome?.toString().trim();

    if (!nome) {
      return res.redirect(`/categorias/${req.params.id}/editar`);
    }

    await Categoria.update({ nome }, { where: { id: req.params.id } });

    res.redirect("/categorias");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao atualizar categoria.");
  }
};

exports.excluir = async (req, res) => {
  try {
    await Categoria.destroy({ where: { id: req.params.id } });
    res.redirect("/categorias");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao excluir categoria.");
  }
};
