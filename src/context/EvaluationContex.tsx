import { useAuth } from "@/hooks/useAuth";
import useAxios from "../hooks/useAxios";
import React, { createContext, useState, ReactNode, useCallback, useMemo } from "react";

export interface Evaluation {
  id: string; 
  employeeId: string;
  employeeName: string;
  score: number;
  comments?: string;
  evaluationDate?: Date; 
  createdBy?: string; 
}




// Note : La récupération par rôle semble correcte.


interface EvaluationResponse {
  evaluation: Evaluation;
}



export interface EvaluationContextType {
  evaluations: Evaluation[] | null;
  addEvaluation: (evaluation: Evaluation) => Promise<void>;
  updateEvaluation: (id: string, updatedEvaluation: Partial<Evaluation>) => Promise<void>;
  deleteEvaluation: (id: string) => Promise<void>;
  fetchEvaluations: () => Promise<void>;
  fetchEvaluationDetail: (id: string) => Promise<void>;
  fetchEvaluationsByEmployee: () => Promise<void>;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

interface EvaluationProviderProps {
  children: ReactNode;
}

export const EvaluationProvider: React.FC<EvaluationProviderProps> = ({ children }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[] | null>(null);
  const { sendRequest } = useAxios<any>();

  const fetchEvaluations = useCallback(async () => {
    try {
      const response = await sendRequest({
        url: "/api/evaluation/getallevaluation",
        method: "GET",
      });
      if (response ) {
        setEvaluations(response);  // Mise à jour de l'état
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (err) {
      console.error("Error fetching evaluations:", err);
    }
  }, [sendRequest]);
  

  



  const { sendRequest: sendSingleRequest } = useAxios<EvaluationResponse>();
  const fetchEvaluationDetail = useCallback(async (id: string) => {
    try {
      const response = await sendSingleRequest({
        url: `/api/evaluation/evaluationone/${id}`,
        method: "GET",
      });
      if (response && response.evaluation) {
        console.log("Evaluation Detail:", response.evaluation);
      }
    } catch (err) {
      console.error("Error fetching evaluation detail:", err);
    }
  }, [sendSingleRequest]);
  

  const { user } = useAuth();

  const fetchEvaluationsByEmployee = useCallback(async () => {
    try {
      const userId = user?.id;
      if (!userId) {
        console.error("User ID is not available");
        return;
      }
  
      const response = await sendRequest({
        url: `/api/evaluation/evaluationbyemployee/${userId}`,
        method: "GET",
      });
      if (response) {
        setEvaluations(response.evaluations); // Utilise setEvaluations
      }
    } catch (err) {
      console.error("Error fetching evaluations by employee:", err);
    }
  }, [sendRequest, user?.id]);
  
  

  

  const addEvaluation = useCallback(
    async (newEvaluation: Evaluation) => {
      try {
        const response = await sendSingleRequest({
          url: "/api/evaluation/addevaluation",
          method: "POST",
          data: newEvaluation,
        });
        if (response) {
          await fetchEvaluations();
        }
      } catch (err) {
        console.error("Error adding evaluation:", err);
      }
    },
    [sendSingleRequest, fetchEvaluations]
  );

  const updateEvaluation = useCallback(
    async (id: string, updatedEvaluation: Partial<Evaluation>) => {
      try {
        await sendSingleRequest({
          url: `/api/evaluation/editevaluation/${id}`,
          method: "PUT",
          data: updatedEvaluation,
        });
        await fetchEvaluations();
      } catch (err) {
        console.error("Error updating evaluation:", err);
      }
    },
    [sendSingleRequest, fetchEvaluations]
  );

  const deleteEvaluation = useCallback(
    async (id: string) => {
      try {
        await sendSingleRequest({
          url: `/api/evaluation/evaluationdel/${id}`,
          method: "DELETE",
        });
        await fetchEvaluations();
      } catch (err) {
        console.error("Error deleting evaluation:", err);
      }
    },
    [sendSingleRequest, fetchEvaluations]
  );

  const value = useMemo(
    () => ({
      evaluations,
      addEvaluation,
      updateEvaluation,
      deleteEvaluation,
      fetchEvaluations,
      fetchEvaluationDetail,
      fetchEvaluationsByEmployee,
    }),
    [evaluations, addEvaluation, updateEvaluation, deleteEvaluation, fetchEvaluations, fetchEvaluationDetail, fetchEvaluationsByEmployee]
  );

  return (
    <EvaluationContext.Provider value={value}>
      {children}
    </EvaluationContext.Provider>
  );
};

export default EvaluationContext;
