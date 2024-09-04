const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.showLogin);
router.post('/login', authController.authenticateUser);
router.get('/logout', authController.logout);
// router.get('/forgot-password', authController.showForgotPassword);
// router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
