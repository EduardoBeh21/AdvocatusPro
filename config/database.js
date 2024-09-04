const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados
  process.env.DB_USER, // Usuário do banco de dados
  process.env.DB_PASSWORD, // Senha do banco de dados
  {
    host: process.env.DB_HOST, // Endereço do host do banco de dados
    dialect: 'mysql', // Dialeto do banco de dados (neste caso, MySQL)
    logging: false // Desativa o log SQL para evitar poluição do console
  }
);

module.exports = sequelize;
