const Categoria = require("../models/Categoria");

//  categorias
exports.listar = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();

    res.render("categoria/listar", {
      categorias,
    });
  } catch (error) {
    console.error(error.parent);
    console.error(error.parent?.sqlMessage);
    console.error(error.parent?.code);
  }
};

// formulário de cadastro
exports.formCadastrar = (req, res) => {
  res.render("categoria/cadastrar");
};

//  criar
exports.criar = async (req, res) => {
  try {
    console.log(req.body);
    await Categoria.create(req.body);
    res.redirect("/categorias");
  } catch (error) {
    console.error(error);
  }
};

// Abrir formulário de edição
exports.formEditar = async (req, res) => {
  const categoria = await Categoria.findByPk(req.params.id);

  res.render("categoria/editar", {
    categoria,
  });
};

// Atualizar categoria
exports.atualizar = async (req, res) => {
  await Categoria.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  res.redirect("/categorias");
};

// Excluir categoria
exports.excluir = async (req, res) => {
  await Categoria.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.redirect("/categorias");
};
