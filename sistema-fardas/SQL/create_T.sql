use sistema_fardas;

DROP TABLE IF EXISTS Categoria;

CREATE TABLE Categoria (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(50) NOT NULL UNIQUE,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

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