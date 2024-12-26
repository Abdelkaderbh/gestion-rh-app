import useAxios from "@/hooks/useAxios";
import React, { createContext, useState, ReactNode, useCallback, useMemo } from "react";

export interface Timesheet {
  id: string;
  employeeId: string;
  date: string; // Format YYYY-MM-DD
  hoursWorked: number;
  status: "Pending" | "Accepted" | "Rejected";
  validatedBy?: string;
  comments?: string;
  employeeName?: string;
}

interface TimesheetContextType {
  timesheets: Timesheet[] | null;
  addTimesheet: (timesheet: Timesheet) => Promise<void>;
  updateTimesheet: (id: string, updatedTimesheet: Partial<Timesheet>) => Promise<void>;
  deleteTimesheet: (id: string) => Promise<void>;
  fetchTimesheets: () => Promise<void>;
  fetchTimesheetsByEmployee: () => Promise<void>;
  validateTimesheet: (id: string, newStatus: string) => Promise<void>;
}

const TimesheetContext = createContext<TimesheetContextType | undefined>(undefined);

interface TimesheetProviderProps {
  children: ReactNode;
}

export const TimesheetProvider: React.FC<TimesheetProviderProps> = ({ children }) => {
  const [timesheets, setTimesheets] = useState<Timesheet[] | null>(null);
  const { sendRequest } = useAxios<any>();
//   const { user } = useAuth();

  const fetchTimesheets = useCallback(async () => {
    try {
      const response = await sendRequest({
        url: "/api/timesheet/alltimesheets",
        method: "GET",
      });
      setTimesheets(response);
    } catch (err) {
      console.error("Error fetching timesheets:", err);
    }
  }, [sendRequest]);

  const fetchTimesheetsByEmployee = useCallback(async () => {
    try {
      const response = await sendRequest({
        url: "/api/timesheet/timesheetbyemployee",
        method: "GET",
      });
      setTimesheets(response);
    } catch (err) {
      console.error("Error fetching timesheets by employee:", err);
    }
  }, [sendRequest]);

  const addTimesheet = useCallback(
    async (newTimesheet: Timesheet) => {
      try {
        await sendRequest({
          url: "/api/timesheet/addtimesheet",
          method: "POST",
          data: newTimesheet,
        });
        
      } catch (err) {
        console.error("Error adding timesheet:", err);
      }
    },
    [sendRequest, fetchTimesheets]
  );

  const updateTimesheet = useCallback(
    async (id: string, updatedTimesheet: Partial<Timesheet>) => {
      try {
        await sendRequest({
          url: `/api/timesheet/edittimesheet/${id}`,
          method: "PUT",
          data: updatedTimesheet,
        });
        
      } catch (err) {
        console.error("Error updating timesheet:", err);
      }
    },
    [sendRequest, fetchTimesheets]
  );

  const deleteTimesheet = useCallback(
    async (id: string) => {
      try {
        await sendRequest({
          url: `/api/timesheet/deltimesheet/${id}`,
          method: "DELETE",
        });
        
      } catch (err) {
        console.error("Error deleting timesheet:", err);
      }
    },
    [sendRequest, fetchTimesheets]
  );

  const validateTimesheet = useCallback(
    async (id: string,newStatus: string) => {
      try {
        await sendRequest({
          url: `/api/timesheet/validate/${id}`,
          method: "PATCH",
          data: { status: newStatus },
        });
        await fetchTimesheets();
      } catch (err) {
        console.error("Error validating timesheet:", err);
      }
    },
    [sendRequest, fetchTimesheets]
  );

  const value = useMemo(
    () => ({
      timesheets,
      addTimesheet,
      updateTimesheet,
      deleteTimesheet,
      fetchTimesheets,
      fetchTimesheetsByEmployee,
      validateTimesheet,
    }),
    [
      timesheets,
      addTimesheet,
      updateTimesheet,
      deleteTimesheet,
      fetchTimesheets,
      fetchTimesheetsByEmployee,
      validateTimesheet,
    ]
  );

  return (
    <TimesheetContext.Provider value={value}>
      {children}
    </TimesheetContext.Provider>
  );
};

export default TimesheetContext;
