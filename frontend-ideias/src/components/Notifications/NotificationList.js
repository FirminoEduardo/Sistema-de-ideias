import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './NotificationList.css'; // Importando o CSS


const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await api.get('/notifications');
      setNotifications(response.data);
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    await api.put(`/notifications/${id}/read`);
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  return (
    <div>
      <h2>Notificações</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} style={{ opacity: notification.isRead ? 0.5 : 1 }}>
            <p>{notification.message}</p>
            <button onClick={() => markAsRead(notification.id)}>Marcar como lida</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
