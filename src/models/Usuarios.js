const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const NivelDeAcesso = require('./NivelDeAcesso');
const TipoDeUsuario = require('./TipoDeUsuario');
const Escritorio = require('./Escritorio');

const Usuarios = sequelize.define('Usuarios', {
  Id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    comment: 'ID único do usuário',
  },
  Nome: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nome do usuário',
  },
  Sobrenome: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Sobrenome do usuário',
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    comment: 'Endereço de e-mail do usuário',
  },
  Senha: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Senha criptografada do usuário',
  },
  Celular: {
    type: DataTypes.STRING(15),
    allowNull: true,
    comment: 'Número de celular do usuário',
  },
  Telefone: {
    type: DataTypes.STRING(15),
    allowNull: true,
    comment: 'Número de telefone fixo do usuário',
  },
  Genero: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Gênero do usuário',
  },
  Foto: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'URL da foto do perfil do usuário',
  },
  Rg: {
    type: DataTypes.STRING(12),
    allowNull: true,
    comment: 'RG do usuário',
  },
  Cpf: {
    type: DataTypes.STRING(14),
    allowNull: true,
    comment: 'CPF do usuário',
  },
  Profissao: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Profissão do usuário',
  },
  Numero_registro: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Número de registro profissional do usuário',
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
  Tipo_de_usuario: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: TipoDeUsuario,
      key: 'Id',
    },
    comment: 'Referência ao tipo de usuário',
  },
  Escritorio: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    references: {
      model: Escritorio,
      key: 'Id',
    },
    comment: 'Referência ao escritório associado ao usuário',
  },
  Cep: {
    type: DataTypes.STRING(11),
    allowNull: true,
    comment: 'CEP do endereço do usuário',
  },
  Cidade: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Cidade onde o usuário reside',
  },
  Estado: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Estado onde o usuário reside',
  },
  Pais: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'País onde o usuário reside',
  },
  Rua: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Nome da rua onde o usuário reside',
  },
  Numero: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: 'Número do endereço do usuário',
  },
  Complemento: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Complemento do endereço do usuário',
  },
  Data_de_criacao: { 
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    comment: 'Data de criação do registro do usuário',
  },
}, {
  timestamps: false,
  tableName: 'Usuarios',
});

// Definição dos relacionamentos
Usuarios.belongsTo(NivelDeAcesso, {
  foreignKey: 'Nivel_de_acesso',
  as: 'nivelDeAcesso',
});

Usuarios.belongsTo(TipoDeUsuario, {
  foreignKey: 'Tipo_de_usuario',
  as: 'tipoDeUsuario',
});

Usuarios.belongsTo(Escritorio, {
  foreignKey: 'Escritorio',
  as: 'escritorio',
});

module.exports = Usuarios;
