const express = require('express');
const { submitIdea } = require('../controllers/ideasController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota protegida para submissão de ideias
router.post('/submit', verifyToken, submitIdea);

module.exports = router;

const { voteIdea } = require('../controllers/ideasController'); //Rota para o usuário votar
//const { verifyToken } = require('../middlewares/authMiddleware'); //Valida se o usuario que votou está cadastrado

router.post('/:id/vote', verifyToken, voteIdea);  // ID da ideia nos parâmetros

const { moderateIdea } = require('../controllers/ideasController');

router.put('/:id/moderate', verifyToken, moderateIdea);  // ID da ideia nos parâmetros

const { listIdeas } = require('../controllers/ideasController');

router.get('/', listIdeas);  // Lista todas as ideias, com filtros opcionais

const { archiveIdea } = require('../controllers/ideasController');

router.put('/:id/archive', verifyToken, archiveIdea);  // Arquivar uma ideia
