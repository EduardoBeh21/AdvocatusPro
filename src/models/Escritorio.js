// models/Escritorio.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Ajuste o caminho conforme necessário

const Escritorio = sequelize.define('Escritorio', {
  Id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    comment: 'ID único do escritório',
  },
  Nome: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nome do escritório',
  },
  CNPJ: {
    type: DataTypes.STRING(18),
    allowNull: true,
    comment: 'CNPJ do escritório',
  },
  Logo: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Caminho para a logo do escritório',
  },
  Dominio: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Domínio de e-mail associado ao escritório',
  },
  Celular: {
    type: DataTypes.STRING(15),
    allowNull: true,
    comment: 'Número de celular do escritório',
  },
  Telefone: {
    type: DataTypes.STRING(15),
    allowNull: true,
    comment: 'Número de telefone fixo do escritório',
  },
  Cep: {
    type: DataTypes.STRING(8),
    allowNull: true,
    comment: 'CEP do endereço do escritório',
  },
  Cidade: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Cidade onde o escritório está localizado',
  },
  Estado: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Estado onde o escritório está localizado',
  },
  Pais: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'País onde o escritório está localizado',
  },
  Rua: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nome da rua onde o escritório está localizado',
  },
  Numero: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'Número do endereço do escritório',
  },
  Complemento: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Complemento do endereço do escritório',
  },
  Tipo_de_residencia: {
    type: DataTypes.TINYINT(1),
    allowNull: true,
    comment: 'Indica se é uma residência ou um endereço comercial',
  },
}, {
  timestamps: false, // Não usa timestamps padrão
  tableName: 'Escritorio',
});

module.exports = Escritorio;
