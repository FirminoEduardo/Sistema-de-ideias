const express = require('express');
const { submitIdea } = require('../controllers/ideasController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota protegida para submissão de ideias
router.post('/submit', verifyToken, submitIdea);

module.exports = router;
