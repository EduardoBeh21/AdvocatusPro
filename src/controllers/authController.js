const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');
const Sessao = require('../models/Sessao');

const EXPIRATION_TIME_MS = 8 * 60 * 60 * 1000; // 8 horas

// Autenticação de um usuário
exports.authenticateUser = async (req, res) => {
  try {
    const { Email, Senha } = req.body;
    if(!Email){
      return res.status(401).json({ message: 'Você precisa informar um E-mail' });
    }
    if(!Senha){
      return res.status(401).json({ message: 'Você precisa informar uma Senha' });
    }
    // Encontra o usuário pelo e-mail
    const user = await Usuarios.findOne({ where: { Email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    // Verifica a senha
    const isMatch = await bcrypt.compare(Senha, user.Senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verifica se já existe uma sessão ativa para o usuário
    const existingSession = await Sessao.findOne({ where: { usuarioId: user.Id } });
    if (existingSession) {
      // Remove a sessão anterior se existir
      await existingSession.destroy();
    }

    // Cria um hash para a nova sessão
    const sessionHash = crypto.randomBytes(64).toString('hex');

    // Cria a nova sessão no banco de dados
    await Sessao.create({
      usuarioId: user.Id,
      hash_sessao: sessionHash,
      expiresAt: new Date(Date.now() + EXPIRATION_TIME_MS), // Define a data de expiração
    });

    // Cria um token JWT para esconder o sessionHash
    const token = jwt.sign({ sessionHash }, process.env.JWT_SECRET, {
      expiresIn: EXPIRATION_TIME_MS / 1000, // Tempo de expiração em segundos
    });

    // Define o token JWT como um cookie
    res.cookie('sessionHash', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: EXPIRATION_TIME_MS 
    });

    res.status(200).json({ message: 'Autenticação bem-sucedida', token: token});
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'Error authenticating user' });
  }
};

exports.logout = async (req, res) => {
  try{
    res.clearCookie('sessionHash');
    res.redirect('/login')
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ message: 'Error Logout, contact the adminstrator.' });
  }
};

exports.showLogin = (req, res) => {
  res.render('Auth/login'); // Renderiza o arquivo login.ejs
};
