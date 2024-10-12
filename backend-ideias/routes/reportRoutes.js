const express = require('express');
const { topIdeas, activeUsers } = require('../controllers/reportController');

const router = express.Router();

router.get('/top-ideas', topIdeas);  // Ideias mais votadas
router.get('/active-users', activeUsers);  // Usuários mais ativos

module.exports = router;
