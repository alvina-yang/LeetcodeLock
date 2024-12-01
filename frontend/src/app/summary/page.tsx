// File: app/src/summary/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import { HoverEffect } from "@/app/components/ui/card-hover-effect";
import { useAnalysis } from "@/app/context/AnalysisContext";

export default function SummaryPage() {
  const { analysis } = useAnalysis();
  const [parsedAnalysis, setParsedAnalysis] = useState<{ title: string; description: string }[]>([]);

  useEffect(() => {
    if (analysis && typeof analysis === "string") {
      const items = analysis.split("\n\n").map(item => {
        const lines = item.split("\n");
        const titleLine = lines.find(line => line.startsWith("name: "));
        const descriptionLine = lines.find(line => line.startsWith("description: "));
        const title = titleLine ? titleLine.replace("name: ", "").trim() : "No Title";
        const description = descriptionLine ? descriptionLine.replace("description: ", "").trim() : "No Description";
        return { title, description };
      });
      setParsedAnalysis(items);
    }
  }, [analysis]);

  if (!analysis) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-800 text-white p-8 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">No Analysis Found</h1>
          <p className="mb-2">Please complete the quiz first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-950 text-white p-8 rounded-xl shadow-xl max-w-6xl w-full overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Quiz Summary</h1>
        {/* Display the analysis using HoverEffect */}
        <HoverEffect
          items={parsedAnalysis.map(item => ({
            title: item.title,
            description: item.description,
            // link is optional and omitted here
          }))}
        />
      </div>
    </div>
  );
}
