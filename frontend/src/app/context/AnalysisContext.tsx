// src/app/context/AnalysisContext.tsx

"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

type AnalysisItem = {
  name: string;
  description: string;
  percentage: number;
};

type Analysis = AnalysisItem[];

type LeetcodeProblem = {
  problem_name: string;
  problem_text: string; // Add problem_text if not already present
  problem_difficulty: string;
};

type LeetcodeCategory = {
  category: string;
  problems: LeetcodeProblem[];
};

type LeetcodeData = LeetcodeCategory[];

type AnalysisContextType = {
  analysis: Analysis | null;
  setAnalysis: (analysis: Analysis) => void;
  leetcodeData: LeetcodeData | null;
  setLeetcodeData: (data: LeetcodeData) => void;
  selectedQuestion: LeetcodeProblem | null;
  setSelectedQuestion: (question: LeetcodeProblem | null) => void;
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [leetcodeData, setLeetcodeData] = useState<LeetcodeData | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<LeetcodeProblem | null>(null);

  return (
    <AnalysisContext.Provider
      value={{
        analysis,
        setAnalysis,
        leetcodeData,
        setLeetcodeData,
        selectedQuestion,
        setSelectedQuestion,
      }}
    >
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
