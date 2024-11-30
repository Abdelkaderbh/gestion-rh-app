import React, { createContext, useState, ReactNode, useCallback, useMemo, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "@/hooks/useAuth";
import { Notification, NotificationContextType } from "@/types/NotificationContextType";



export interface NotificationsResponse {
    notifications: Notification[];
  }

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[] | null>(null);
  const { sendRequest } = useAxios<any>();
  
  const { user } = useAuth();
const userId = user?.id; 


const fetchNotifications = useCallback(async () => {
    console.log("userId...", userId);
    if (!userId) return;
    try {
      const response = await sendRequest({
        url: `/api/notification/notificationuser/${userId}`,
        method: "GET",
      });
      console.log("Réponse de l'API :", response);
      if (response) {
        setNotifications(response);
      }
    } catch (err) {
      console.error("Erreur de récupération des notifications :", err);
    }
  }, [sendRequest, userId]);
  

  useEffect(() => {
    console.log("fetchNotifications...", notifications);
    if (userId) {
      fetchNotifications();
    } else {
      console.log("userId non défini, pas de notifications");
    }
  }, [fetchNotifications, userId]);
  

  const markAsRead = useCallback(async (id: number) => {
    try {
      await sendRequest({
        url: `/api/notification/markasread/${id}`,
        method: "PUT",
      });
      await fetchNotifications();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la notification :", err);
    }
  }, [sendRequest, fetchNotifications]);

  const deleteNotification = useCallback(async (id: number) => {
    try {
      await sendRequest({
        url: `/api/notification/deletenotification/${id}`,
        method: "DELETE",
      });
      await fetchNotifications();
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  }, [sendRequest, fetchNotifications]);

  
  const unreadCount = useMemo(() => {
    return notifications?.filter(notification => !notification.readed).length || 0;
  }, [notifications]);
  console.log("unreadCount=",unreadCount);
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = useMemo(() => ({
    notifications,
    fetchNotifications,
    markAsRead,
    deleteNotification,
    clearNotifications,
    unreadCount,
  }), [notifications, fetchNotifications, markAsRead,deleteNotification, clearNotifications, unreadCount]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
