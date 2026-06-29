const Usuario = require("../models/usuario");
const Categoria = require("../models/Categoria");

exports.listar = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Categoria, as: "categoria" }],
      order: [["id", "ASC"]],
    });

    res.render("usuario/listar", {
      usuarios: usuarios.map((u) => u.get({ plain: true })),
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao listar usuários.");
  }
};

exports.formCadastrar = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });
    res.render("usuario/cadastrar", { categorias });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao carregar formulário.");
  }
};

exports.criar = async (req, res) => {
  try {
    const nome = req.body.nome?.toString().trim();
    const email = req.body.email?.toString().trim();
    const senha = req.body.senha?.toString().trim();
    const perfil = req.body.perfil?.toString().trim() || "Funcionário";
    const categoriaId = req.body.categoriaId
      ? Number(req.body.categoriaId)
      : null;

    if (!nome || !email) {
      return res.redirect("/usuarios/novo");
    }

    await Usuario.create({
      nome,
      email,
      senha,
      perfil,
      categoriaId,
    });

    res.redirect("/usuarios");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao cadastrar usuário.");
  }
};

exports.formEditar = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    const categorias = await Categoria.findAll({
      raw: true,
      order: [["id", "ASC"]],
    });

    if (!usuario) {
      return res.redirect("/usuarios");
    }

    res.render("usuario/editar", {
      usuario: usuario.get({ plain: true }),
      categorias,
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao carregar usuário.");
  }
};

exports.atualizar = async (req, res) => {
  try {
    const nome = req.body.nome?.toString().trim();
    const email = req.body.email?.toString().trim();
    const senha = req.body.senha?.toString().trim();
    const perfil = req.body.perfil?.toString().trim() || "Funcionário";
    const categoriaId = req.body.categoriaId
      ? Number(req.body.categoriaId)
      : null;

    if (!nome || !email) {
      return res.redirect(`/usuarios/${req.params.id}/editar`);
    }

    const dadosAtualizados = {
      nome,
      email,
      perfil,
      categoriaId,
    };

    if (senha) {
      dadosAtualizados.senha = senha;
    }

    await Usuario.update(dadosAtualizados, { where: { id: req.params.id } });
    res.redirect("/usuarios");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao atualizar usuário.");
  }
};

exports.excluir = async (req, res) => {
  try {
    await Usuario.destroy({ where: { id: req.params.id } });
    res.redirect("/usuarios");
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao excluir usuário.");
  }
};
