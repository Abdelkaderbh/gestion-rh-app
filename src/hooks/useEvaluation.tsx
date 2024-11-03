
import EvaluationContext from "@/context/EvaluationContex";
import React from "react";

export const useEvaluation = () => {
  const context = React.useContext(EvaluationContext);
  if (!context) {
    throw new Error("useEvaluation must be used within an EvaluationProvider");
  }
  return context;
};
