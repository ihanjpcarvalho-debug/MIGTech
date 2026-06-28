USE sistema_fardas;

DROP TABLE IF EXISTS categoria;

CREATE TABLE categoria(

id INT AUTO_INCREMENT PRIMARY KEY,

nome VARCHAR(50) NOT NULL UNIQUE,

descricao VARCHAR(100),

createdAt DATETIME,

updatedAt DATETIME

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