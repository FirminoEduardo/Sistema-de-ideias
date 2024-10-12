const { Notification } = require('../models');

// Listar notificações do usuário
exports.getNotifications = async (req, res) => {
  const userId = req.user.id;  // O usuário logado

  try {
    const notifications = await Notification.findAll({ where: { userId } });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar notificações.' });
  }
};

// Marcar notificações como lidas
exports.markAsRead = async (req, res) => {
  const notificationId = req.params.id;

  try {
    const notification = await Notification.findByPk(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notificação não encontrada.' });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ message: 'Notificação marcada como lida.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao marcar notificação como lida.' });
  }
};
