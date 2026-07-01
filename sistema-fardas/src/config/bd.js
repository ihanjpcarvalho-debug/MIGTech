
const { Sequelize } = require("sequelize");
require("dotenv").config();

const dialect = process.env.DB_DIALECT || "sqlite";
const commonConfig = {
  dialect,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize =
  dialect === "mysql"
    ? new Sequelize(
        process.env.DB_NAME || "sistema_fardas",
        process.env.DB_USER || "root",
        process.env.DB_PASSWORD || "",
        {
          host: process.env.DB_HOST || "localhost",
          port: Number(process.env.DB_PORT || 3306),
          ...commonConfig,
        },
      )
    : new Sequelize({
        ...commonConfig,
        storage: process.env.DB_STORAGE || "./database.sqlite",
      });

module.exports = sequelize;
