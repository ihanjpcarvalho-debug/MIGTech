CREATE SCHEMA IF NOT EXISTS sistema_fardas;
USE sistema_fardas;

DROP TABLE IF EXISTS Movimentacao;
DROP TABLE IF EXISTS Fardamento;
DROP TABLE IF EXISTS Categoria;
/*categoria*/
CREATE TABLE Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
/*fardamento*/
CREATE TABLE Fardamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    camisa VARCHAR(100) NOT NULL,
    short VARCHAR(100) NOT NULL,
    tamanho VARCHAR(10) NOT NULL DEFAULT 'P',
    quantidade INT NOT NULL DEFAULT 1,
    entrega DATE NOT NULL,
    categoriaId INT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoriaId) REFERENCES Categoria(id) ON DELETE SET NULL
);
/*movimentação*/
CREATE TABLE Movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('Entrada', 'Saída') NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    data DATE NOT NULL,
    observacao VARCHAR(255) NULL,
    fardamentoId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fardamentoId) REFERENCES Fardamento(id) ON DELETE CASCADE
);
/*codigos*/
INSERT INTO Categoria (nome) VALUES
('Normal'),
('Educação Física');

INSERT INTO Fardamento (camisa, short, tamanho, quantidade, entrega, categoriaId) VALUES
('Camisa Branca', 'Short Azul', 'M', 10, '2026-07-01', 1),
('Camisa Verde', 'Short Preto', 'G', 6, '2026-07-02', 2);

INSERT INTO Movimentacao (tipo, quantidade, data, observacao, fardamentoId) VALUES
('Entrada', 5, '2026-07-01', 'Recebimento inicial', 1),
('Saída', 2, '2026-07-02', 'Entrega para aluno', 1);

SELECT * FROM Movimentacao;

SELECT * FROM Movimentacao WHERE id = 1;

UPDATE Movimentacao
SET quantidade = 7,
    observacao = 'Atualização de entrada'
WHERE id = 1;

DELETE FROM Movimentacao WHERE id = 2;


