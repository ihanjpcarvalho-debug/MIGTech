use sistema_fardas;

DROP TABLE IF EXISTS Categoria;

CREATE TABLE Categoria (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(50) NOT NULL UNIQUE,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
/* os comandos tambem tao aqui, tanto de usuario, tanto de categoria*/
CREATE TABLE Usuario(

id INT AUTO_INCREMENT PRIMARY KEY,

nome VARCHAR(100),

email VARCHAR(80),

senha VARCHAR(255),

perfil ENUM(
'Administrador',
'Funcionário'
),

createdAt DATETIME,

updatedAt DATETIME

);

INSERT INTO Usuario (nome, matricula, email, senha, perfil) VALUES
('maua', '2026001', 'maua@empresa.com', '123456', 'Administrador'),

('maua2', '2026002', 'maua2@empresa.com', '123456', 'Funcionario'),

('maua3', '2026003', 'maua3@empresa.com', '123456', 'Funcionario');

INSERT INTO Categoria (nome) VALUES
('Normal'),
('Educação Física');

SELECT * FROM Categoria;

SELECT * FROM Categoria WHERE nome = 'Normal';

UPDATE Categoria SET nome = 'EDF' WHERE id = 2;

DELETE FROM Categoria WHERE id = 2;

UPDATE Usuario SET nome = 'João da Silva', email = 'joao.silva@empresa.com' WHERE id = 1;

DELETE FROM Usuario WHERE id = 3;

SELECT * FROM Usuario;

SELECT * FROM Usuario WHERE matricula = '2026001';

SELECT * FROM Usuario WHERE perfil = 'Administrador';