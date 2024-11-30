import React from "react";
import NotificationContext from "@/context/NotificationContext";

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
