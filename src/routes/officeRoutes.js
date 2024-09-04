const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAccessLevel = require('../middlewares/checkAccessLevel');
const { verifySession, checkPermission } = require('../middlewares/authMiddleware');
const { upload, checkImageResolution } = require('../middlewares/uploadMiddleware');
const NivelDeAcesso = require('../models/NivelDeAcesso');
const TipoDeUsuario = require('../models/TipoDeUsuario');
const Escritorio = require('../models/Escritorio');

    // Rota para criar um novo usuário com upload de foto
    router.post('/usuarios/criar', 
        verifySession, 
        upload.single('Foto'), 
        checkImageResolution, 
        userController.createUser
    );

  router.get('/usuarios/criar', verifySession, checkPermission('Criar Usuários'), checkAccessLevel, async (req ,res) =>{
    try {
        const niveisDeAcesso = await NivelDeAcesso.findAll({
          where: {
            Id: req.allowedLevels,
          },
        });
    
        const tiposDeUsuarios = await TipoDeUsuario.findAll();
    
        let escritorios = [];
        if (req.canAssignOffice) {
          escritorios = await Escritorio.findAll();
        }
        
        const assignedOfficeName = await Escritorio.findOne({
            where: {
              Id: req.assignedOffice,
            },
          });
        res.render('User/create', {
          niveisDeAcesso,
          tiposDeUsuarios,
          escritorios,
          canAssignOffice: req.canAssignOffice,
          assignedOffice: req.assignedOffice || null,
          assignedOfficeName: assignedOfficeName ? assignedOfficeName.Nome : null
        });
      } catch (error) {
        console.error('Erro ao carregar a página de criação de usuários:', error);
        res.status(500).send('Erro no servidor'+ error);
      }
    });


module.exports = router;
