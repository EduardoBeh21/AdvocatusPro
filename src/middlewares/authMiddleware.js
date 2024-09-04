const Usuarios = require('../models/Usuarios');
const Sessao = require('../models/Sessao');
const Permissoes = require('../models/Permissoes');
const TiposUsuariosPermissoes = require('../models/TiposUsuariosPermissoes');
const jwt = require('jsonwebtoken');

// Middleware para verificar a sessão
async function verifySession(req, res, next) {
  try {
    // Obtém o token JWT do cookie
    const token = req.cookies.sessionHash;

    // Se o token não estiver presente, responde com status 401 (Unauthorized)
    if (!token){
    //return res.status(401).json({ message: 'Access Denied: No token provided' });
      res.redirect('/login')
    }
    // Verifica e decodifica o JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error('Erro ao verificar token:', error.message);
      return res.status(401).json({ message: 'Access Denied: Invalid token' });
    }

    const sessionHash = decoded.sessionHash;

    // Encontra a sessão no banco de dados usando o hash descriptografado
    const session = await Sessao.findOne({ where: { hash_sessao: sessionHash } });
    if (!session || (session.expiresAt && new Date() > session.expiresAt)) {
      return res.status(401).json({ message: 'Session expired or invalid', date: session.expiresAt && new Date()});
    }

    // Encontra o usuário associado à sessão
    const user = await Usuarios.findByPk(session.usuarioId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Adiciona as informações do usuário ao objeto request
    req.user = user;

    // Passa o controle para o próximo middleware ou rota
    next();
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ message: 'Error verifying session' });
  }
}

// Middleware para verificar permissões do usuário
function checkPermission(requiredPermission) {
  return async (req, res, next) => {
    try {
      // Obtém o tipo de usuário do objeto request
      const tipo_de_usuario = req.user?.Tipo_de_usuario; // Assumindo que `req.user` tem `Tipo_de_usuario`

      if (!tipo_de_usuario) {
        return res.status(403).json({ message: 'Tipo de usuário não encontrado' });
      }

      // Busca o ID da permissão solicitada
      const permissao = await Permissoes.findOne({ where: { Nome: requiredPermission } });
      console.log(permissao);
      if (!permissao) {
        return res.status(404).json({ message: 'Permissão não encontrada' });
      }

      const permissaoId = permissao.Id;

      // Verifica se o tipo de usuário possui a permissão solicitada
      const permissaoTipoUsuario = await TiposUsuariosPermissoes.findOne({
        where: {
          TipoUsuarioId: tipo_de_usuario,
          PermissaoId: permissaoId,
        },
      });

      if (permissaoTipoUsuario) {
        // Se tiver a permissão, passa o controle para o próximo middleware ou rota
        return next();
      } else {
        // Se não tiver a permissão, responde com status 403 (Forbidden)
        //return res.status(403).json({ message: 'Forbidden' });
        res.render('err/forbidden')
      }
    } catch (error) {
      console.error('Error checking permission:', error);
      return res.status(500).json({ message: 'Error checking permission' });
    }
  };
}

module.exports = { verifySession, checkPermission };
