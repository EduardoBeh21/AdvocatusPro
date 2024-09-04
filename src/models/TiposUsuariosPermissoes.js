// models/TiposUsuariosPermissoes.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Ajuste o caminho conforme necessário
const TipoDeUsuario = require('./TipoDeUsuario');
const Permissoes = require('./Permissoes');

const TiposUsuariosPermissoes = sequelize.define('Tipos_usuarios_permissoes', {
  Id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    comment: 'ID único da associação entre tipo de usuário e permissão',
  },
  TipoUsuarioId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: TipoDeUsuario,
      key: 'Id',
    },
    comment: 'ID do tipo de usuário',
  },
  PermissaoId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: Permissoes,
      key: 'Id',
    },
    comment: 'ID da permissão',
  },
}, {
  timestamps: false,
  tableName: 'Tipos_usuarios_permissoes',
});

TiposUsuariosPermissoes.belongsTo(TipoDeUsuario, {
  foreignKey: 'TipoUsuarioId',
  as: 'tipoDeUsuario',
});

TiposUsuariosPermissoes.belongsTo(Permissoes, {
  foreignKey: 'PermissaoId',
  as: 'permissoes',
});

module.exports = TiposUsuariosPermissoes;
