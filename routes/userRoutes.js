const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);

// Ruta de prueba para verificar la conexión a la base de datos
router.get('/test-connection', userController.testConnection);

module.exports = router;
