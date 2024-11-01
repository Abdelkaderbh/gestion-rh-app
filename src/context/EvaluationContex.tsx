import useAxios from "../hooks/useAxios";
import React, { createContext, useState, ReactNode, useCallback, useMemo } from "react";

export interface Evaluation {
  id?: number; 
  employeeId: number;
  score: number;
  comments?: string;
  evaluationDate: string; 
  createdBy?: number; 
}

interface EvaluationResponse {
  evaluation: Omit<Evaluation, "id">;
}

interface EvaluationsResponse {
  evaluations: Omit<Evaluation, "id">[];
}

export interface EvaluationContextType {
  evaluations: Omit<Evaluation, "id">[] | null;
  addEvaluation: (evaluation: Omit<Evaluation, "id">) => Promise<void>;
  updateEvaluation: (id: number, updatedEvaluation: Partial<Omit<Evaluation, "id">>) => Promise<void>;
  deleteEvaluation: (id: number) => Promise<void>;
  fetchEvaluations: () => Promise<void>;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

interface EvaluationProviderProps {
  children: ReactNode;
}

export const EvaluationProvider: React.FC<EvaluationProviderProps> = ({ children }) => {
  const [evaluations, setEvaluations] = useState<Omit<Evaluation, "id">[] | null>(null);
  const { sendRequest } = useAxios<EvaluationsResponse>();

  const fetchEvaluations = useCallback(async () => {
    try {
      const response = await sendRequest({
        url: "/api/evaluation/getallevaluation",
        method: "GET",
      });
      if (response) {
        setEvaluations(response.evaluations);
      }
    } catch (err) {
      console.error("Error fetching evaluations:", err);
    }
  }, [sendRequest]);

  const { sendRequest: sendSingleRequest } = useAxios<EvaluationResponse>();

  const addEvaluation = useCallback(
    async (newEvaluation: Omit<Evaluation, "id">) => {
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
    async (id: number, updatedEvaluation: Partial<Omit<Evaluation, "id">>) => {
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
    async (id: number) => {
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
    }),
    [evaluations, addEvaluation, updateEvaluation, deleteEvaluation, fetchEvaluations]
  );

  return (
    <EvaluationContext.Provider value={value}>
      {children}
    </EvaluationContext.Provider>
  );
};

export default EvaluationContext;
