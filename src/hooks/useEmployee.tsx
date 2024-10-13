import EmployeeContext from "@/context/EmployeeContext";
import React from "react";

export const useEmployee = () => {
  const context = React.useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};
