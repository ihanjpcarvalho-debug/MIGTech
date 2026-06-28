const Categoria = require("../models/Categoria");

// Listar
exports.listar = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ order: [["id", "ASC"]] });
    res.render("categoria/listar", { categorias });
  } catch (erro) {
    console.log(erro);
    res.send("Erro ao listar categorias.");
  }
};

//formulário
exports.formCadastrar = (req, res) => {
  res.render("categoria/cadastrar");
};

//Cadastrar
exports.criar = async (req, res) => {
  try {
    const { nome, descricao, ativa } = req.body;
    await Categoria.create({ nome, descricao, ativa: ativa === "true" });
    res.redirect("/categorias");
  } catch (erro) {
    console.log(erro);
    res.send("Erro ao cadastrar.");
  }
};

// Abrir edição
exports.formEditar = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    res.render("categoria/editar", { categoria });
  } catch (erro) {
    console.log(erro);
  }
};

// Atualizar
exports.atualizar = async (req, res) => {
  try {
    const { nome, descricao, ativa } = req.body;
    await Categoria.update(
      { nome, descricao, ativa: ativa === "true" },
      { where: { id: req.params.id } },
    );
    res.redirect("/categorias");
  } catch (erro) {
    console.log(erro);
  }
};

// Excluir
exports.excluir = async (req, res) => {
  try {
    await Categoria.destroy({ where: { id: req.params.id } });

    res.redirect("/categorias");
  } catch (erro) {
    console.log(erro);
  }
};

// Abrir formulário de edição
exports.formEditar = async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);

  res.render("categoria/editar", { categoria });
};

// Atualizar
exports.atualizar = async (req, res) => {
  await Categoria.update(req.body, { where: { id: req.params.id } });
  res.redirect("/categorias");
};

// Excluir categoria
exports.excluir = async (req, res) => {
  await Categoria.destroy({ where: { id: req.params.id } });

  res.redirect("/categorias");
};
