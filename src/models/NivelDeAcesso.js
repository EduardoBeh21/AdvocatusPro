// models/NivelDeAcesso.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Ajuste o caminho conforme necessário

const NivelDeAcesso = sequelize.define('Nivel_de_acesso', {
  Id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    comment: 'ID único do nível de acesso',
  },
  Nome: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nome do nível de acesso',
  },
  Descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Descrição detalhada do nível de acesso',
  },
}, {
  timestamps: false,
  tableName: 'Nivel_de_acesso',
});

module.exports = NivelDeAcesso;
