const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// Função para ajustar o caminho do arquivo
const adjustFilePath = (filePath) => {
  return filePath ? filePath.replace('public/', '') : null;
};

// Criação de um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { Nome, Sobrenome, Email, Senha, Celular, Telefone, Genero, Rg, Cpf, Profissao, Numero_registro, Nivel_de_acesso, Tipo_de_usuario, Escritorio, Cep, Cidade, Estado, Pais, Rua, Numero, Complemento, Tipo_de_residencia } = req.body;

    // Verifica se o e-mail já está em uso
    const existingUser = await Usuarios.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já está em uso' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(Senha, 10);

    // Ajusta o caminho da foto, se houver
    const fotoPath = req.file ? adjustFilePath(req.file.path) : null;
    console.log(Escritorio)
    // Cria o novo usuário
    const newUser = await Usuarios.create({
      Nome,
      Sobrenome,
      Email,
      Senha: hashedPassword,
      Celular,
      Telefone,
      Genero,
      Foto: fotoPath, // Salva o caminho ajustado do arquivo
      Rg,
      Cpf,
      Profissao,
      Numero_registro,
      Nivel_de_acesso,
      Tipo_de_usuario,
      Escritorio,
      Cep,
      Cidade,
      Estado,
      Pais,
      Rua,
      Numero,
      Complemento,
      Tipo_de_residencia
    });
    res.redirect("http://159.112.180.31:3011/" + fotoPath);
    //res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Função para buscar usuários
exports.getUsers = async (req, res) => {
  try {
    // Busca todos os usuários
    const users = await Usuarios.findAll();
    // Retorna a lista de usuários em formato JSON
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};
