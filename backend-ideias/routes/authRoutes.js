const express = require('express');
const { login, register } = require('../controllers/authController'); // Import correto do controlador de autenticação
const { submitIdea } = require('../controllers/ideasController'); // Certifique-se de que este caminho está correto
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas de autenticação
router.post('/register', register);
router.post('/login', login);

// Rota protegida para submissão de ideias
router.post('/ideas/submit', verifyToken, submitIdea);

module.exports = router;
