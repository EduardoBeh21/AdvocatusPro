// models/Permissoes.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Ajuste o caminho conforme necessário

const Permissoes = sequelize.define('Permissoes', {
  Id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  Nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'Permissoes',
});

module.exports = Permissoes;
