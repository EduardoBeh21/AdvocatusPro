// models/TipoDeUsuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Ajuste o caminho conforme necessário
const NivelDeAcesso = require('./NivelDeAcesso');

const TipoDeUsuario = sequelize.define('Tipo_de_usuario', {
  Id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    comment: 'ID único do tipo de usuário',
  },
  Nome: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nome do tipo de usuário',
  },
  Nivel_de_acesso: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: NivelDeAcesso,
      key: 'Id',
    },
    comment: 'Referência ao nível de acesso do usuário',
  },
}, {
  timestamps: false,
  tableName: 'Tipo_de_usuario',
});

TipoDeUsuario.belongsTo(NivelDeAcesso, {
  foreignKey: 'Nivel_de_acesso',
  as: 'nivelDeAcesso',
});

module.exports = TipoDeUsuario;
