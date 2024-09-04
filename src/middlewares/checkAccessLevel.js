// middlewares/checkAccessLevel.js
module.exports = (req, res, next) => {
  const userAccessLevel = req.user.Nivel_de_acesso;

  if (userAccessLevel === 0) {
    req.allowedLevels = [0, 1, 2]; // Nível 0 pode criar qualquer usuário
    req.canAssignOffice = true; // Pode definir o escritório
  } else if (userAccessLevel === 1) {
    req.allowedLevels = [1, 2]; // Nível 1 pode criar níveis 1 e 2
    req.canAssignOffice = true; // Pode definir o escritório
  } else if (userAccessLevel === 2) {
    req.allowedLevels = [2]; // Nível 2 só pode criar outros usuários nível 2
    req.canAssignOffice = false; // Não pode definir o escritório
    req.assignedOffice = req.user.Escritorio; // Escritório é automaticamente definido
  } else {
    return res.status(403).send('Acesso negado');
  }

  next();
};
