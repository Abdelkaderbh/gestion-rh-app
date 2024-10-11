import React from "react";
import LeaveContext from "@/context/LeaveContext";

export const useLeave = () => {
  const context = React.useContext(LeaveContext);
  if (!context) {
    throw new Error("useLeave must be used within a LeaveProvider");
  }
  return context;
};
