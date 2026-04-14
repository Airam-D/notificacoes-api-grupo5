const { Sequelize } = require("sequelize");

const sequelize = new Sequelize( //new significa criar uma nova instância
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql", // dialect significa o tipo de banco de dados
        logging: process.env.NODE_ENV === "development" ? console.log : false, // logging: exibe as consultas SQL no console durante o desenvolvimento
    },
);

module.exports = sequelize;