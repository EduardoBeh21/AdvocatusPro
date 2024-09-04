const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Sessao = sequelize.define('Sessao', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  hash_sessao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expiresAt: {
    type: DataTypes.DATE
  },
  usuarioId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: 'Usuarios',
      key: 'Id'
    }
  }
}, {
  tableName: 'Sessao',
  timestamps: false
});

module.exports = Sessao;
