module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    userId: DataTypes.INTEGER,   // O usuário que receberá a notificação
    message: DataTypes.STRING,   // A mensagem da notificação
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,       // Notificações começam como não lidas
    }
  });

  Notification.associate = function(models) {
    Notification.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Notification;
};
