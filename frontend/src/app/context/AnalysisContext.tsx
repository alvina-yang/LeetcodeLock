"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

type Analysis = any; // Replace 'any' with the actual type based on your backend response

type AnalysisContextType = {
  analysis: Analysis | null;
  setAnalysis: (analysis: Analysis) => void;
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  return (
    <AnalysisContext.Provider value={{ analysis, setAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
