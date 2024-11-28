import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import useAxios from "../hooks/useAxios";
import { LeaveContextType } from "@/types/LeaveContextType";
import { jwtDecode } from "jwt-decode";

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export interface Leave {
  id: string;
  userId: string;
  description: string;
  start_date: string;
  end_date: string;
  type: string;
  status: "Pending" | "Accepted" | "Rejected";
}

interface LeaveResponse {
  conge: Leave;
}

interface LeavesResponse {
  conges: Leave[];
  empConge: Leave[];
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
      if (response && response.conges) {
        setLeaves(response.conges);
      }
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  }, [sendRequest]);

  const { sendRequest: sendSingleRequest } = useAxios<LeaveResponse>();

  const addLeave = useCallback(
    async (newLeave: Omit<Leave, "id" | "status">) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");
        const decodedToken: { userId: string } = jwtDecode(token);
        const userId = decodedToken.userId;
        const leaveWithUserId = { ...newLeave, userId };
        const response = await sendSingleRequest({
          url: "/api/conge/new",
          method: "POST",
          data: { ...leaveWithUserId, status: "PENDING" },
        });
        if (response) {
          await fetchLeaveByEmployee();
        }
      } catch (err) {
        console.error("Error adding leave:", err);
      }
    },
    [sendSingleRequest, fetchLeaves]
  );

  const updateLeaveStatus = useCallback(
    async (id: string, status: "Pending" | "Accepted" | "Rejected") => {
      try {
        const response = await sendRequest({
          url: `/api/conge/${id}`,
          method: "PUT",
          data: { status },
        });
        if (response) {
          console.log("Leave status updated:", response);
          await fetchLeaves();
        }
      } catch (err) {
        console.error("Error updating leave status:", err);
      }
    },
    [sendRequest, fetchLeaves]
  );

  const deleteLeave = useCallback(
    async (id: string) => {
      try {
        await sendSingleRequest({
          url: `/api/conge/cancel/${id}`,
          method: "DELETE",
        });
        await fetchLeaves();
        await fetchLeaveByEmployee();
      } catch (err) {
        console.error("Error deleting leave:", err);
      }
    },
    [sendSingleRequest, fetchLeaves]
  );

  const fetchLeaveByEmployee = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await sendRequest({
        url: "http://localhost:5000/api/conge/my-conges",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      if (response && response.empConge) {
        setLeaves(response.empConge);
      }
    } catch (error) {
      console.error("Error fetching leaves by employee:", error);
    }
  }, [sendRequest]);

  const value = useMemo(
    () => ({
      leaves,
      addLeave,
      updateLeaveStatus,
      deleteLeave,
      fetchLeaves,
      fetchLeaveByEmployee,
    }),
    [
      leaves,
      addLeave,
      updateLeaveStatus,
      deleteLeave,
      fetchLeaves,
      fetchLeaveByEmployee,
    ]
  );

  return (
    <LeaveContext.Provider value={value}>{children}</LeaveContext.Provider>
  );
};

export default LeaveContext;
