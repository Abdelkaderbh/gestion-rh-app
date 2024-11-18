import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import useAxios from "../hooks/useAxios";
import { LeaveContextType } from "@/types/LeaveContextType";

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export interface Leave {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface LeaveResponse {
  leave: Leave;
}

interface LeavesResponse {
  leaves: Leave[];
}

interface LeaveProviderProps {
  children: ReactNode;
}

export const LeaveProvider: React.FC<LeaveProviderProps> = ({ children }) => {
  const [leaves, setLeaves] = useState<Leave[] | null>(null);

  const { sendRequest } = useAxios<LeavesResponse>();

  const fetchLeaves = useCallback(async () => {
    try {
      const response = await sendRequest({
        url: "/api/conge/all",
        method: "GET",
      });
      if (response) {
        setLeaves(response.leaves);
      }
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  }, [sendRequest]);

  const { sendRequest: sendSingleRequest } = useAxios<LeaveResponse>();

  const addLeave = useCallback(
    async (newLeave: Omit<Leave, "id" | "status">) => {
      try {
        const response = await sendSingleRequest({
          url: "/api/leaves/addLeave",
          method: "POST",
          data: { ...newLeave, status: "PENDING" },
        });
        if (response) {
          await fetchLeaves();
        }
      } catch (err) {
        console.error("Error adding leave:", err);
      }
    },
    [sendSingleRequest, fetchLeaves]
  );

  const updateLeave = useCallback(
    async (id: string, updatedLeave: Partial<Omit<Leave, "id">>) => {
      try {
        await sendSingleRequest({
          url: `/api/leaves/update/${id}`,
          method: "PUT",
          data: updatedLeave,
        });
        await fetchLeaves();
      } catch (err) {
        console.error("Error updating leave:", err);
      }
    },
    [sendSingleRequest, fetchLeaves]
  );

  const deleteLeave = useCallback(
    async (id: string) => {
      try {
        await sendSingleRequest({
          url: `/api/leaves/delete/${id}`,
          method: "DELETE",
        });
        await fetchLeaves();
      } catch (err) {
        console.error("Error deleting leave:", err);
      }
    },
    [sendSingleRequest, fetchLeaves]
  );

  const value = useMemo(
    () => ({
      leaves,
      addLeave,
      updateLeave,
      deleteLeave,
      fetchLeaves,
    }),
    [leaves, addLeave, updateLeave, deleteLeave, fetchLeaves]
  );

  return (
    <LeaveContext.Provider value={value}>{children}</LeaveContext.Provider>
  );
};

export default LeaveContext;
