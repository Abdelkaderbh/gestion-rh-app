import { Leave } from "@/context/LeaveContext";

export interface LeaveContextType {
    leaves: Leave[] | null;
    addLeave: (leave: Omit<Leave, "id" | "status">) => Promise<void>;
    updateLeave: (id: string, updatedLeave: Partial<Omit<Leave, "id">>) => Promise<void>;
    deleteLeave: (id: string) => Promise<void>;
    fetchLeaves: () => Promise<void>;
  }
  