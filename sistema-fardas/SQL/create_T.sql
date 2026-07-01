create schema sistema_fardas; 
use sistema_fardas;

DROP TABLE IF EXISTS Categoria;

CREATE TABLE Categoria (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(50) NOT NULL UNIQUE,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
/* os comandos tambem tao aqui, tanto de usuario, tanto de categoria*/


INSERT INTO Categoria (nome) VALUES
('Normal'),
('Educação Física');

SELECT * FROM Categoria;

SELECT * FROM Categoria WHERE nome = 'Normal';

UPDATE Categoria SET nome = 'EDF' WHERE id = 2;

DELETE FROM Categoria WHERE id = 2;

