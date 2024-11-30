export interface Notification {
    id: number;
    userId: string;
    type: string;
    message: string;
    createdAt: string;
    readed: boolean;
  }
  
 
  export interface NotificationContextType {
    notifications: Notification[] | null;
    fetchNotifications: () => Promise<void>;
    deleteNotification: (id: number) => Promise<void>;
    markAsRead: (id: number) => Promise<void>;
    clearNotifications: () => void;
    unreadCount: number;
  }


  
  