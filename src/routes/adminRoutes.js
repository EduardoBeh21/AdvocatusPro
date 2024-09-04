const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifySession, checkPermission } = require('../middlewares/authMiddleware');
const officeController = require('../controllers/officeController');

router.get('/users', verifySession, checkPermission('Visualizar Usuários'), userController.getUsers);

// Rota GET para teste
router.get('/test', (req, res) => {
  res.json('teste');
});

    // Rota GET para exibir o formulário de criação de escritório
    router.get('/escritorios/criar', 
      verifySession, 
      checkPermission('Criar Escritórios'), 
      (req, res) => {
          res.render('Office/create');
      }
  );
  router.use('/escritorios/criar', (req, res, next) => {
    console.log('Dados recebidos na rota:', req.body);
    next();
  });
  
  // Rota POST para processar a criação do escritório
  router.post('/escritorios/criar', 
      verifySession, 
      checkPermission('Criar Escritórios'),
      officeController.createOffice
  );


module.exports = router;
