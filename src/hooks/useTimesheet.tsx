
import TimesheetContext from "@/context/TimeSheetContext";
import React from "react";

export const useTimesheet = () => {
  const context = React.useContext(TimesheetContext);
  if (!context) {
    throw new Error("useTimesheet must be used within a TimesheetProvider");
  }
  return context;
};
