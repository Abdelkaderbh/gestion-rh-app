import { Leave } from "@/context/LeaveContext";

export interface LeaveContextType {
  leaves: Leave[] | null;
  addLeave: (leave: Omit<Leave, "id" | "status">) => Promise<void>;
  updateLeaveStatus: (
    id: string,
    updatedLeave: Pick<Leave, "status">) => Promise<void>;
  deleteLeave: (id: string) => Promise<void>;
  fetchLeaves: () => Promise<void>;
  fetchLeaveByEmployee: () => Promise<void>;
}
