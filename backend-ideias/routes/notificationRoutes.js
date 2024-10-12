const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getNotifications);  // Listar notificações do usuário
router.put('/:id/read', verifyToken, markAsRead);  // Marcar notificação como lida

module.exports = router;
