const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para ler JSON e dados do form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  (HTML, CSS, JS do front)
app.use(express.static(path.join(__dirname, "public")));

// Caminho do arquivo de dados
const dbPath = path.join(__dirname, "alunos.json");

// Função para ler alunos
function lerAlunos() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, "[]");
    }
    const dados = fs.readFileSync(dbPath);
    return JSON.parse(dados);
}

// Função para salvar alunos
function salvarAlunos(alunos) {
    fs.writeFileSync(dbPath, JSON.stringify(alunos, null, 2));
}

/*
   ROTAS DA API */

// Listar todos os alunos
app.get("/alunos", (req, res) => {
    const alunos = lerAlunos();
    res.json(alunos);
});

// Criar aluno
app.post("/alunos", (req, res) => {
    const alunos = lerAlunos();

    const novoAluno = {
        id: Date.now(),
        nome: req.body.nome,
        turma: req.body.turma,
        serie: req.body.serie,
        matricula: req.body.matricula,
        campus: req.body.campus
    };

    alunos.push(novoAluno);
    salvarAlunos(alunos);

    res.json({ message: "Aluno cadastrado com sucesso!", aluno: novoAluno });
});

// Editar aluno
app.put("/alunos/:id", (req, res) => {
    const alunos = lerAlunos();

    const id = Number(req.params.id);
    const index = alunos.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Aluno não encontrado" });
    }

    alunos[index] = {
        id,
        nome: req.body.nome,
        turma: req.body.turma,
        serie: req.body.serie,
        matricula: req.body.matricula,
        campus: req.body.campus
    };

    salvarAlunos(alunos);

    res.json({ message: "Aluno atualizado com sucesso!" });
});

// Deletar aluno
app.delete("/alunos/:id", (req, res) => {
    let alunos = lerAlunos();

    const id = Number(req.params.id);
    alunos = alunos.filter(a => a.id !== id);

    salvarAlunos(alunos);

    res.json({ message: "Aluno removido com sucesso!" });
});

// Pesquisar aluno por nome ou matrícula
app.get("/pesquisar", (req, res) => {
    const alunos = lerAlunos();

    const { nome, matricula } = req.query;

    let resultado = alunos;

    if (nome) {
        resultado = resultado.filter(a =>
            a.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    if (matricula) {
        resultado = resultado.filter(a =>
            a.matricula.includes(matricula)
        );
    }

    res.json(resultado);
});

/*
   INICIAR SERVIDOR
 */

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});S
